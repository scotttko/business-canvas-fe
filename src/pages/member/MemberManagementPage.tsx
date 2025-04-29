import MemberHeader from '@/components/member/header/MemberHeader'
import { Flex } from 'antd'
import { useState } from 'react'

function MemberManagementPage() {
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
      </Flex>
    </>
  )
}

export default MemberManagementPage
