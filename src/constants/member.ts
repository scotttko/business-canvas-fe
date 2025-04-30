import { Field, MemberFieldName, MemberRecord } from '@/models/member'

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

export const INITIAL_MEMBER_RECORD: MemberRecord[] = [
  {
    id: crypto.randomUUID(),
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    date: '2024-10-02',
    job: '개발자',
    emailAgreed: true,
  },
  {
    id: crypto.randomUUID(),
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    date: '2024-10-01',
    job: 'PO',
    emailAgreed: false,
  },
]
