import { Header } from 'components/Header'
import { FC } from 'react'
import { Root, SubtitleContainer, SubtitleTypo } from './styled'

type PloggingMeetingListPageProps = {
  className?: string
}

export const PloggingMeetingListPage: FC<PloggingMeetingListPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Header title={'플로깅 함께하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleTypo>어떤 모임에서 플로깅을 즐겨볼까요?</SubtitleTypo>
      </SubtitleContainer>
    </Root>
  )
}
