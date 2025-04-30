import { css } from '@emotion/react'
import { Select as AntdSelect, SelectProps } from 'antd'

function Select({ ...props }: SelectProps) {
  return (
    <AntdSelect
      style={{ minWidth: 85 }}
      dropdownStyle={{ width: 198 }}
      popupMatchSelectWidth={false}
      css={selectStyles}
      {...props}
    />
  )
}

export default Select

const selectStyles = css`
  &:hover {
    .ant-select-selection-item,
    .ant-select-arrow {
      color: #739fff;
    }
  }
`
