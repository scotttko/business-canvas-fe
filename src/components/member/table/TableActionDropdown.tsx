import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'

function TableActionDropdown() {
  const items: MenuProps['items'] = [
    {
      label: '수정',
      key: 'edit',
    },
    {
      type: 'divider',
    },
    {
      label: '삭제',
      key: 'delete',
      danger: true,
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    console.log({ key })
  }

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={['click']}
      overlayStyle={{ minWidth: 185 }}
      placement="bottomRight"
    >
      <Button icon={<MoreOutlined size={32} />} type="text" size="large" />
    </Dropdown>
  )
}

export default TableActionDropdown
