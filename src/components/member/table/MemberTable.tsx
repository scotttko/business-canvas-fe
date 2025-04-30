import { MEMBER_FIELDS } from '@/constants/member'
import { MemberRecord } from '@/models/member'
import { Button, Flex, Table, Typography } from 'antd'
import { css } from '@emotion/react'
import { PlusOutlined } from '@ant-design/icons'
import useMemberRecord from '@/hooks/useMemberRecord'
import { useCallback } from 'react'
import { useModalContext } from '@/contexts/ModalContext'
import dayjs from 'dayjs'
import MemberRecordForm from '../form/MemberRecordForm'
import useTable from '@/hooks/useTable'

function MemberTable() {
  const { records, onDeleteRecord, onSaveRecord } = useMemberRecord()
  const { openModal, closeModal } = useModalContext()
  const { columns, rowSelection } = useTable<MemberRecord>({
    data: records,
    fields: MEMBER_FIELDS,
    getFilterLabelMap: (fieldName) =>
      fieldName === 'emailAgreed' ? { true: '선택됨', false: '선택 안함' } : null,
    getActions: (record) => [
      {
        label: '수정',
        key: 'edit',
        onClick: () => handleOpenMemberForm(record),
      },
      {
        type: 'divider',
      },
      {
        label: '삭제',
        key: 'delete',
        danger: true,
        onClick: () => onDeleteRecord(record.id),
      },
    ],
  })

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
