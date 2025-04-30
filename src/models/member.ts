import { Dayjs } from 'dayjs'
export interface MemberRecord {
  id: string
  name: string
  address: string
  memo: string
  date: string
  job: string
  emailAgreed: boolean
}

export type MemberFieldName = Exclude<keyof MemberRecord, 'id'>

export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox'

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

export interface MemberFormRecord extends Omit<MemberRecord, 'date'> {
  date: Dayjs
}
