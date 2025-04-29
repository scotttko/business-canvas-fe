import MemberHeader from '@/components/member/header/MemberHeader'
import MemberTable from '@/components/member/table/MemberTable'
import useMemberRecord from '@/hooks/useMemberRecord'
import { Flex } from 'antd'
import { useState } from 'react'

function MemberManagementPage() {
  const { records, setRecords } = useMemberRecord()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Flex vertical>
        <MemberHeader onAddClick={handleAddClick} />
        <MemberTable records={records} />
      </Flex>
    </>
  )
}

export default MemberManagementPage
