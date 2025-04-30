import { INITIAL_MEMBER_RECORD } from '@/constants/member'
import { STORAGE_KEY } from '@/constants/storage'
import { MemberRecord } from '@/models/member'
import { StorageMode } from '@/models/storage'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { useCallback, useState } from 'react'

const STORAGE_MODE: StorageMode = import.meta.env.VITE_STORAGE || 'in-memory'

const getInitialRecord = () => {
  if (STORAGE_MODE === 'local-storage') {
    const storedRecords = getLocalStorage<MemberRecord[]>(STORAGE_KEY.MEMBER_RECORDS)

    if (!storedRecords) {
      setLocalStorage<MemberRecord[]>(STORAGE_KEY.MEMBER_RECORDS, [...INITIAL_MEMBER_RECORD])
      return [...INITIAL_MEMBER_RECORD]
    }

    return storedRecords
  }

  return [...INITIAL_MEMBER_RECORD]
}

const updateStorageRecord = (record: MemberRecord[]) => {
  if (STORAGE_MODE === 'local-storage') {
    setLocalStorage<MemberRecord[]>(STORAGE_KEY.MEMBER_RECORDS, record)
  }
}

function useMemberRecord() {
  const [memberRecords, setMemberRecords] = useState<MemberRecord[]>(() => getInitialRecord())

  const handleSaveRecord = useCallback(
    (record: MemberRecord) => {
      const recordIndex = memberRecords.findIndex((prevRecord) => prevRecord.id === record.id)
      const newRecords =
        recordIndex === -1
          ? [...memberRecords, { ...record, id: crypto.randomUUID() }]
          : memberRecords.map((r) => (r.id === record.id ? record : r))

      setMemberRecords(newRecords)
      updateStorageRecord(newRecords)
    },
    [memberRecords],
  )

  const handleDeleteRecord = useCallback(
    (recordId: string) => {
      const newRecords = memberRecords.filter((r) => r.id !== recordId)

      setMemberRecords(newRecords)
      updateStorageRecord(newRecords)
    },
    [memberRecords],
  )

  return {
    records: memberRecords,
    setRecords: setMemberRecords,
    onSaveRecord: handleSaveRecord,
    onDeleteRecord: handleDeleteRecord,
  }
}

export default useMemberRecord
