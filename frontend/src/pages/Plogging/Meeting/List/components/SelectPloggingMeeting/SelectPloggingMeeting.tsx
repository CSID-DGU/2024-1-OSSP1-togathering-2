import { PlusCircleOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateMeetingButton, CreateMeetingButtonTypo, Root } from './styled'

type SelectPloggingMeetingProps = {
  className?: string
}

export const SelectPloggingMeeting: FC<SelectPloggingMeetingProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickCreateMeetingButton = () => {
    navigate('/plogging/meeting/create/course')
  }

  return (
    <Root className={className}>
      <CreateMeetingButton type={'primary'} onClick={onClickCreateMeetingButton}>
        <PlusCircleOutlined />
        <CreateMeetingButtonTypo>새로운 플로깅 모임 만들기</CreateMeetingButtonTypo>
      </CreateMeetingButton>
    </Root>
  )
}
