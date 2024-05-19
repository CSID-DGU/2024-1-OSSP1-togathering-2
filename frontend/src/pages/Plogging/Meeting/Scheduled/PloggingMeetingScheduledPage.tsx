import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { SCHEDULED_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { PloggingMeetingViewer } from 'pages/Plogging/components/PloggingMeetingViewer'
import { FC } from 'react'
import {
  ContentContainer,
  PloggingMeetingViewerContainer,
  Root,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type PloggingMeetingScheduledPageProps = {
  className?: string
}

export const PloggingMeetingScheduledPage: FC<PloggingMeetingScheduledPageProps> = ({ className }) => {
  const washedMeetingList = (() => {
    return SCHEDULED_MEETING_LIST_SAMPLE
  })()

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>안녕하세요, 교수님</TitleTypo>
        <SubtitleTypo>예정된 모임들을 모아봤어요!</SubtitleTypo>
      </TitleContainer>
      <ContentContainer>
        <PloggingMeetingViewerContainer>
          {washedMeetingList.map((meetingItem) => (
            <PloggingMeetingViewer
              type={'SCHEDULED'}
              meetingItem={meetingItem}
              key={`plogging_meeting_viewer_${meetingItem.id}`}
            />
          ))}
        </PloggingMeetingViewerContainer>
      </ContentContainer>
      <TabBar />
    </Root>
  )
}
