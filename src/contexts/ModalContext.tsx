import { css } from '@emotion/react'
import { Modal, ModalProps as AntdModalProps } from 'antd'
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface ModalProps extends AntdModalProps {
  content: ReactNode | null
}

type ModalConfig = Omit<ModalProps, 'open'>

interface ModalContextValue {
  openModal: (config: ModalConfig) => void
  closeModal: () => void
}

const defaultConfig: ModalProps = {
  open: false,
  content: null,
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalConfig, setModalConfig] = useState<ModalProps>(defaultConfig)

  const { content, ...restModalConfigs } = modalConfig

  const openModal = useCallback((config: ModalConfig) => {
    setModalConfig({ ...config, open: true })
  }, [])

  const closeModal = useCallback(() => {
    setModalConfig(defaultConfig)
  }, [])

  const values = useMemo(() => ({ openModal, closeModal }), [closeModal, openModal])

  return (
    <ModalContext.Provider value={values}>
      {children}
      <Modal {...restModalConfigs} css={modalStyles}>
        {content}
      </Modal>
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  const values = useContext(ModalContext)

  if (!values) {
    throw new Error('ModalContext 내부에서 사용해주세요')
  }

  return values
}

const modalStyles = css`
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-header {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    margin: 0;

    .ant-modal-title {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .ant-modal-close {
    width: 22px;
    height: 22px;
    top: 12px;
  }

  .ant-modal-footer {
    padding: 12px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    background-color: rgba(0, 0, 0, 0.02);
    margin: 0;
  }
`
