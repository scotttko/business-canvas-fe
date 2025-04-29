export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox'

export type MemberFieldName = 'name' | 'address' | 'memo' | 'date' | 'job' | 'emailAgreed'

export interface Field<T> {
  type: FieldType
  name: T
  label: string
  required: boolean
  options?: string[]
}

export interface FieldColumn<T> {
  title: string
  dataIndex: T
}

export interface MemberRecord {
  id: string
  name: string
  address: string
  memo: string
  date: string
  job: string
  emailAgreed: boolean
}
