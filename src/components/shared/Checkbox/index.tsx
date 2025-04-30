import { css } from '@emotion/react'
import { CheckboxProps, Checkbox as AntdCheckbox } from 'antd'

function Checkbox({ ...props }: CheckboxProps) {
  return <AntdCheckbox {...props} css={checkboxStyles} />
}

export default Checkbox

const checkboxStyles = css`
  .ant-checkbox-inner {
    border-radius: 6px;
  }
`
