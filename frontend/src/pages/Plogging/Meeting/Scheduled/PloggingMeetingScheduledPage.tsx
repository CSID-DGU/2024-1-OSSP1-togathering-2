import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { FC } from 'react'
import { ContentContainer, Root, SubtitleTypo, TitleContainer, TitleTypo } from './styled'

type PloggingMeetingScheduledPageProps = {
  className?: string
}

export const PloggingMeetingScheduledPage: FC<PloggingMeetingScheduledPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>안녕하세요, 교수님</TitleTypo>
        <SubtitleTypo>예정된 모임들을 모아봤어요!</SubtitleTypo>
      </TitleContainer>
      <ContentContainer>asd</ContentContainer>
      <TabBar />
    </Root>
  )
}
