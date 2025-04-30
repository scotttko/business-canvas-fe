import { MemberRecord } from '@/models/member'
import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps } from 'antd'

interface TableActionDropdownProps {
  record: MemberRecord
  onEditClick: (record?: MemberRecord) => void
  onDeleteClick: (recordId: string) => void
}

function TableActionDropdown({ record, onEditClick, onDeleteClick }: TableActionDropdownProps) {
  const items: MenuProps['items'] = [
    {
      label: '수정',
      key: 'edit',
      onClick: () => onEditClick(record),
    },
    {
      type: 'divider',
    },
    {
      label: '삭제',
      key: 'delete',
      danger: true,
      onClick: () => onDeleteClick(record.id),
    },
  ]

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
