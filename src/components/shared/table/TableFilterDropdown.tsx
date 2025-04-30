import { css } from '@emotion/react'
import { Checkbox, CheckboxChangeEvent, Flex } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { Key } from 'react'

interface TableFilterDropdownProps {
  options: {
    text: string
    value: Key
  }[]
  filterProps: FilterDropdownProps
}

function TableFilterDropdown({
  options,
  filterProps: { selectedKeys, setSelectedKeys, confirm },
}: TableFilterDropdownProps) {
  const handleChange = (option: Key) => (ev: CheckboxChangeEvent) => {
    const { checked } = ev.target

    const nextKeys = checked ? [...selectedKeys, option] : selectedKeys.filter((k) => k !== option)

    setSelectedKeys(nextKeys)
    confirm({ closeDropdown: false })
  }
  return (
    <Flex vertical gap={8} css={tableFilterStyles}>
      {options.map((option) => (
        <Checkbox
          key={String(option.value)}
          checked={selectedKeys.includes(option.value)}
          onChange={handleChange(option.value)}
          css={checkboxStyles}
        >
          {option.text}
        </Checkbox>
      ))}
    </Flex>
  )
}

export default TableFilterDropdown

const tableFilterStyles = css`
  padding: 8px;
  border-radius: 10px;
`

const checkboxStyles = css`
  padding: 5px 12px;
  border-radius: 5px;

  &.ant-checkbox-wrapper-checked {
    background-color: #f0f7ff;
  }

  &:not(.ant-checkbox-wrapper-checked):hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`
