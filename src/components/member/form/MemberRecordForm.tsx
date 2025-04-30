import { MEMBER_FIELDS } from '@/constants/member'
import { MemberRecord, MemberFormRecord } from '@/models/member'
import { css } from '@emotion/react'
import { Button, Flex, Form } from 'antd'
import { useEffect } from 'react'
import MemberRecordFormItem from './MemberRecordFormItem'

interface MemberRecordFormProps {
  record: MemberFormRecord | null
  onSaveRecord: (record: MemberRecord) => void
  onClose: () => void
}
function MemberRecordForm({ record, onSaveRecord, onClose }: MemberRecordFormProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
  }, [record, form])

  const handleSubmitSuccess = (values: MemberFormRecord) => {
    onSaveRecord({
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      ...(record && { id: record.id }),
    })
    onClose()
  }

  return (
    <Form form={form} layout="vertical" css={formStyles} onFinish={handleSubmitSuccess}>
      {MEMBER_FIELDS.map((field) => (
        <MemberRecordFormItem key={field.name} field={field} />
      ))}

      <Flex align="center" justify="end" gap={8} css={formFooterStyles}>
        {onClose && <Button onClick={onClose}>취소</Button>}
        <Button type="primary" htmlType="submit">
          {record ? '수정' : '추가'}
        </Button>
      </Flex>
    </Form>
  )
}

export default MemberRecordForm

const formStyles = css`
  padding-top: 10px;

  .ant-form-item {
    padding: 0 24px;
    margin-bottom: 20px;
  }

  .ant-form-item-label {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 !important;
  }

  .ant-form-item-required::before {
    display: none !important;
  }
`

const formFooterStyles = css`
  padding: 12px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(0, 0, 0, 0.02);
`
