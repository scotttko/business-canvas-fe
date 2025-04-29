import { Field, MemberFieldName } from '@/models/member'

export const MEMBER_FIELDS: Field<MemberFieldName>[] = [
  { type: 'text', name: 'name', label: '이름', required: true },
  { type: 'text', name: 'address', label: '주소', required: false },
  { type: 'textarea', name: 'memo', label: '메모', required: false },
  { type: 'date', name: 'date', label: '가입일', required: true },
  {
    type: 'select',
    name: 'job',
    label: '직업',
    required: false,
    options: ['개발자', 'PO', '디자이너'],
  },
  { type: 'checkbox', name: 'emailAgreed', label: '이메일 수신 동의', required: false },
]
