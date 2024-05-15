import { Header } from 'components/Header'
import { FC, useState } from 'react'
import {
  ButtonContainer,
  ContentContainer,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  Root,
  StartButton,
  StartButtonTypo,
  SubtitleContainer,
  SubtitleTypo,
} from './styled'

import { IconRun } from '@tabler/icons-react'
import { PLOGGING_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { PloggingMeetingViewer } from 'pages/Plogging/components/PloggingMeetingViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import { MeetingListType } from 'types/meeting'

type PloggingMeetingConfirmPageProps = {
  className?: string
}

export const PloggingMeetingConfirmPage: FC<PloggingMeetingConfirmPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingMeetingId } = state
  const navigate = useNavigate()
  const [meetingList] = useState<MeetingListType>(PLOGGING_MEETING_LIST_SAMPLE)

  const selectedPloggingMeetingItem =
    meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId).length > 0
      ? meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId)[0]
      : null

  const onClickStartButton = () => {
    navigate('/plogging/meeting/alert', { state: { ploggingMeetingId } })
  }

  return (
    <Root className={className}>
      <Header title={'플로깅 함께하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleTypo>플로깅 모임 정보를 확인해주세요.</SubtitleTypo>
      </SubtitleContainer>
      {selectedPloggingMeetingItem && (
        <>
          <PloggingMeetingViewer isDetail={true} meetingItem={selectedPloggingMeetingItem} />
          <ContentContainer>
            <InfoContainer>
              <InfoItemContainer>
                <InfoItemTitleTypo>모임 이름</InfoItemTitleTypo>
                <InfoItemContentTypo>{selectedPloggingMeetingItem.name}</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
            <InfoContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>총 거리</InfoItemTitleTypo>
                <InfoItemContentTypo>1,000m</InfoItemContentTypo>
              </InfoItemContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>예상 소요 시간</InfoItemTitleTypo>
                <InfoItemContentTypo>12분</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
            <InfoContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>총 인원</InfoItemTitleTypo>
                <InfoItemContentTypo>{selectedPloggingMeetingItem.maxCount}명</InfoItemContentTypo>
              </InfoItemContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>완주시 얻게 되는 점수</InfoItemTitleTypo>
                <InfoItemContentTypo>24점</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
          </ContentContainer>
          <ButtonContainer>
            <StartButton type={'primary'} onClick={onClickStartButton}>
              <IconRun />
              <StartButtonTypo> 바로 시작하기</StartButtonTypo>
            </StartButton>
          </ButtonContainer>
        </>
      )}
    </Root>
  )
}
