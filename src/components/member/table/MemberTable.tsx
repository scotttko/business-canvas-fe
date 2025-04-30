import { MEMBER_FIELDS } from '@/constants/member'
import { Field, MemberFieldName, MemberRecord } from '@/models/member'
import {
  Button,
  Checkbox,
  Flex,
  Table,
  TableColumnsType,
  TableColumnType,
  TableProps,
  Typography,
} from 'antd'
import TableActionDropdown from './TableActionDropdown'
import { css } from '@emotion/react'
import { PlusOutlined } from '@ant-design/icons'
import useMemberRecord from '@/hooks/useMemberRecord'
import { useCallback } from 'react'
import { useModalContext } from '@/contexts/ModalContext'
import dayjs from 'dayjs'
import MemberRecordForm from '../form/MemberRecordForm'
import TableFilterDropdown from './TableFilterDropdown'

function MemberTable() {
  const { records, onDeleteRecord, onSaveRecord } = useMemberRecord()
  const { openModal, closeModal } = useModalContext()

  const handleOpenMemberForm = useCallback(
    (record?: MemberRecord) => {
      openModal({
        title: record ? '회원 추가' : '회원 수정',
        content: (
          <MemberRecordForm
            record={record ? { ...record, date: dayjs(record.date) } : null}
            onSaveRecord={onSaveRecord}
            onClose={closeModal}
          />
        ),
        footer: null,
        onCancel: closeModal,
        destroyOnClose: true,
      })
    },
    [closeModal, onSaveRecord, openModal],
  )

  const getColumnFilter = (
    records: MemberRecord[],
    field: Field<MemberFieldName>,
    labelMap?: Record<string, string>,
  ) => {
    const recordValueSet = new Set(records.filter((r) => r[field.name]).map((r) => r[field.name]))

    return Array.from(recordValueSet).map((val) => ({
      text: labelMap?.[val as string] ?? String(val),
      value: String(val),
    }))
  }

  const columns: TableColumnsType<MemberRecord> = [
    ...MEMBER_FIELDS.map(
      (field) =>
        ({
          title: field.label,
          dataIndex: field.name,
          filterDropdown: (props) => (
            <TableFilterDropdown
              options={getColumnFilter(
                records,
                field,
                field.name === 'emailAgreed' ? { true: '선택됨', false: '선택 안함' } : {},
              )}
              filterProps={props}
            />
          ),
          onFilter: (value, record) => String(record[field.name]) === value,
          ...(field.name === 'emailAgreed' && {
            render: (checked: boolean) => <Checkbox checked={checked} />,
          }),
        } as TableColumnType<MemberRecord>),
    ),
    {
      title: '',
      key: 'action',
      render: (_: string, record: MemberRecord) => {
        return (
          <TableActionDropdown
            record={record}
            onEditClick={handleOpenMemberForm}
            onDeleteClick={onDeleteRecord}
          />
        )
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
    <Flex vertical>
      <Flex align="center" justify="space-between" css={headerStyle}>
        <Typography.Title level={5}>회원 목록</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          onClick={() => handleOpenMemberForm()}
        >
          추가
        </Button>
      </Flex>
      <Table
        dataSource={records}
        columns={columns}
        pagination={false}
        rowKey="id"
        rowSelection={{ ...rowSelection }}
        css={tableStyle}
      />
    </Flex>
  )
}

export default MemberTable

const headerStyle = css`
  padding: 8px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`

const tableStyle = css`
  td.ant-table-selection-column {
    border-right: 1px solid #f0f0f0;
  }
`
