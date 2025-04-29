import { STORAGE_KEY } from '@/constants/storage'
import { MemberRecord } from '@/models/member'
import { StorageMode } from '@/models/storage'
import { getLocalStorage } from '@/utils/storage'
import { useCallback, useState } from 'react'

const STORAGE_MODE: StorageMode = import.meta.env.VITE_STORAGE || 'in-memory'

const initialRecordData: MemberRecord[] = [
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

const getInitialRecord = () => {
  if (STORAGE_MODE === 'local-storage') {
    const storedRecords = getLocalStorage<MemberRecord[]>(STORAGE_KEY.MEMBER_RECORDS) ?? [
      ...initialRecordData,
    ]

    return storedRecords
  }

  return [...initialRecordData]
}

function useMemberRecord() {
  const [memberRecords, setMemberRecords] = useState<MemberRecord[]>(() => getInitialRecord())

  return { records: memberRecords, setRecords: setMemberRecords }
}

export default useMemberRecord
