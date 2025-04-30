import { Checkbox, DatePicker, Select } from '@/components/shared'
import { FormItemLabel } from '@/components/shared/form'
import { Field, MemberFieldName } from '@/models/member'
import { Form, FormItemProps, Input } from 'antd'
import { ReactNode } from 'react'

interface MemberRecordFormItemProps {
  field: Field<MemberFieldName>
}

const componentMap: Record<
  Field<MemberFieldName>['type'],
  (field: Field<MemberFieldName>) => ReactNode
> = {
  text: () => <Input />,
  textarea: () => <Input.TextArea rows={2} />,
  date: () => <DatePicker />,
  select: (field) => <Select options={field.options?.map((opt) => ({ label: opt, value: opt }))} />,
  checkbox: (field) => <Checkbox>{field.label}</Checkbox>,
}

function MemberRecordFormItem({ field }: MemberRecordFormItemProps) {
  const { type, name, label, required } = field

  const rules = [
    { required, message: `${label}을 입력해주세요.` },
    ...(type === 'text' ? [{ max: 20, message: '20자 이내로 입력해주세요.' }] : []),
    ...(type === 'textarea' ? [{ max: 50, message: '50자 이내로 입력해주세요.' }] : []),
  ]

  const sharedProps: FormItemProps = {
    name,
    label: <FormItemLabel required={required}>{label}</FormItemLabel>,
    rules,
    validateFirst: true,
    initialValue: field.name === 'emailAgreed' ? false : '',
    ...(type === 'select' && { style: { width: 'fit-content' } }),
    ...(type === 'checkbox' && { valuePropName: 'checked' }),
  }

  const renderComponent = componentMap[type]

  return <Form.Item {...sharedProps}>{renderComponent(field)}</Form.Item>
}

export default MemberRecordFormItem
