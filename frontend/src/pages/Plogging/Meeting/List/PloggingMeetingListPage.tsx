import { Header } from 'components/Header'
import { SelectPloggingMeeting } from 'pages/Plogging/components/SelectPloggingMeeting'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MeetingCategoryType } from 'types/meeting'
import { ContentContainer, Root, SubtitleContainer, SubtitleTypo } from './styled'

type PloggingMeetingListPageProps = {
  className?: string
}

export const PloggingMeetingListPage: FC<PloggingMeetingListPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onSelectPloggingMeeting = (id: number, category: MeetingCategoryType) => () => {
    navigate('/meeting/confirm', { state: { ploggingMeetingId: id, selectedCategory: category } })
  }

  return (
    <Root className={className}>
      <Header title={'함께하기'} showBackButton />
      <SubtitleContainer>
        {/* <SubtitleCircle>
          <SubtitleCircleTypo>*</SubtitleCircleTypo>
        </SubtitleCircle> */}
        <SubtitleTypo>어떤 모임에 참여하고 싶으신가요?</SubtitleTypo>
      </SubtitleContainer>
      <ContentContainer>
        <SelectPloggingMeeting onSelectPloggingMeeting={onSelectPloggingMeeting} />
      </ContentContainer>
    </Root>
  )
}
