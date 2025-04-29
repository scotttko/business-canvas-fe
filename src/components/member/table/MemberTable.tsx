import { MEMBER_FIELDS } from '@/constants/member'
import { MemberRecord } from '@/models/member'
import { Checkbox, Table, TableColumnsType, TableProps } from 'antd'
import TableActionDropdown from './TableActionDropdown'
import { css } from '@emotion/react'

interface MemberTableProps {
  records: MemberRecord[]
}
function MemberTable({ records }: MemberTableProps) {
  const columns: TableColumnsType<MemberRecord> = [
    ...MEMBER_FIELDS.map((field) => {
      if (field.name === 'emailAgreed') {
        return {
          title: field.label,
          dataIndex: field.name,
          render: (checked: boolean) => <Checkbox checked={checked} />,
        }
      }

      return {
        title: field.label,
        dataIndex: field.name,
      }
    }),
    {
      title: '',
      key: 'action',
      render: (value: string, record: MemberRecord) => {
        console.log(value, record)
        return <TableActionDropdown />
      },
      width: 48,
    },
  ]

  const rowSelection: TableProps<MemberRecord>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: MemberRecord[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record: MemberRecord) => ({
      name: record.name,
    }),
  }

  return (
    <Table
      dataSource={records}
      columns={columns}
      pagination={false}
      rowKey={'id'}
      rowSelection={{ ...rowSelection }}
      css={tableStyle}
    />
  )
}

export default MemberTable

const tableStyle = css`
  td.ant-table-selection-column {
    border-right: 1px solid #f0f0f0;
  }
`
