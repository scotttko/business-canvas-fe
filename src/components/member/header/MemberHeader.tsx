import { Button, Flex, Typography } from 'antd'
import { css } from '@emotion/react'
import { PlusOutlined } from '@ant-design/icons'

interface MemberHeaderProps {
  onAddClick: () => void
}
function MemberHeader({ onAddClick }: MemberHeaderProps) {
  return (
    <Flex align="center" justify="space-between" css={headerStyle}>
      <Typography.Title level={5}>회원 목록</Typography.Title>
      <Button type="primary" icon={<PlusOutlined />} iconPosition="start" onClick={onAddClick}>
        추가
      </Button>
    </Flex>
  )
}

export default MemberHeader

const headerStyle = css`
  padding: 8px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`
