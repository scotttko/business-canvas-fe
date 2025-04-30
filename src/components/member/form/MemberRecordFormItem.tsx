import FormItemLabel from '@/components/shared/form/FormItemLabel'
import { Field, MemberFieldName } from '@/models/member'
import { Checkbox, DatePicker, Form, FormItemProps, Input, Select } from 'antd'

interface MemberRecordFormItemProps {
  field: Field<MemberFieldName>
}

function MemberRecordFormItem({ field }: MemberRecordFormItemProps) {
  const { type, name, label, required, options } = field

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
  }

  switch (type) {
    case 'text':
      return (
        <Form.Item key={name} {...sharedProps}>
          <Input />
        </Form.Item>
      )
    case 'textarea':
      return (
        <Form.Item key={name} {...sharedProps}>
          <Input.TextArea rows={2} />
        </Form.Item>
      )
    case 'date':
      return (
        <Form.Item key={name} {...sharedProps}>
          <DatePicker style={{ width: 160 }} />
        </Form.Item>
      )
    case 'select':
      return (
        <Form.Item key={name} {...sharedProps} style={{ width: 'fit-content' }}>
          <Select
            options={options?.map((opt) => ({ label: opt, value: opt }))}
            allowClear
            style={{ minWidth: 85 }}
            dropdownStyle={{ width: 198 }}
            popupMatchSelectWidth={false}
          />
        </Form.Item>
      )
    case 'checkbox':
      return (
        <Form.Item key={name} {...sharedProps} valuePropName="checked">
          <Checkbox>{label}</Checkbox>
        </Form.Item>
      )
    default:
      return null
  }
}

export default MemberRecordFormItem
