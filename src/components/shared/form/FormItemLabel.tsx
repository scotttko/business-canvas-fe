import { css } from '@emotion/react'
import { Flex, Typography } from 'antd'
import { PropsWithChildren } from 'react'

interface FormItemLabelProps extends PropsWithChildren {
  required?: boolean
}

const { Text } = Typography

function FormItemLabel({ children, required }: FormItemLabelProps) {
  return (
    <Flex align="center" gap={4}>
      <Text css={formLabelStyles}>{children}</Text>
      {required && (
        <Text type="danger" css={formLabelStyles}>
          *
        </Text>
      )}
    </Flex>
  )
}

export default FormItemLabel

const formLabelStyles = css`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.45);
`
