import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'

interface TableActionDropdownProps {
  items: MenuProps['items']
}

function TableActionDropdown({ items }: TableActionDropdownProps) {
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      overlayStyle={{ minWidth: 185 }}
      placement="bottomRight"
    >
      <Button icon={<MoreOutlined size={32} />} type="text" size="large" />
    </Dropdown>
  )
}

export default TableActionDropdown
