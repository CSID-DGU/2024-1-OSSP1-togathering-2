import { IconCheck, IconPhoto } from '@tabler/icons-react'
import { Header } from 'components/Header'
import { MEETING_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { useBooleanState } from 'hooks/useBooleanState'
import { PloggingMeetingViewer } from 'pages/Plogging/components/PloggingMeetingViewer'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LocalStorageMeetingListType, MeetingListType } from 'types/meeting'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import {
  ButtonContainer,
  ContentContainer,
  ImageUploadButton,
  ImageUploadButtonTypo,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  Root,
  StopButton,
  StopButtonTypo,
  SubtitleTypo,
} from './styled'

type PloggingMeetingProgressPageProps = {
  className?: string
}

export const PloggingMeetingProgressPage: FC<PloggingMeetingProgressPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingMeetingId, selectedCategory } = state
  const navigate = useNavigate()
  const [meetingList, setMeetingList] = useState<MeetingListType>(ALL_MEETING_LIST_SAMPLE)
  const { state: isSimulating, setTrue: startSimulate, setFalse: stopSimulate } = useBooleanState(false)

  const selectedPloggingMeetingItem =
    meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId).length > 0
      ? meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId)[0]
      : null

  const onClickTestButton = () => {
    startSimulate()
    return
  }
  const onClickButtonPloggingDone = () => {
    navigate('/plogging/meeting/review', { state })
    return
  }

  useEffect(() => {
    let currentMeetingList = loadLocalStorage(MEETING_LIST_KEY)
    if (typeof currentMeetingList === 'string') {
      let parseMeetingList = JSON.parse(currentMeetingList) as LocalStorageMeetingListType
      let newMeetingList = parseMeetingList.meetingList
      setMeetingList(newMeetingList)
    }
  }, [])

  return (
    <Root className={className}>
      <Header showLogo />
      <SubtitleTypo>
        모두 함께 아자아자 파이팅!
        <br />
        오늘의 {getMeetingCategoryLabel(selectedCategory)}으로 건강해지고 있어요!
      </SubtitleTypo>
      {selectedPloggingMeetingItem && (
        <ContentContainer>
          <PloggingMeetingViewer
            isDetail={true}
            meetingItem={selectedPloggingMeetingItem}
            isSimulating={isSimulating}
            stopSimulate={stopSimulate}
          />
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>이동한 거리</InfoItemTitleTypo>
              <InfoItemContentTypo>298m / 1,000m</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>시간</InfoItemTitleTypo>
              <InfoItemContentTypo>00:07:34</InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>제보한 쓰레기</InfoItemTitleTypo>
              <InfoItemContentTypo>2개</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>획득한 점수</InfoItemTitleTypo>
              <InfoItemContentTypo>10점</InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          <ButtonContainer>
            <ImageUploadButton type={'primary'} onClick={onClickTestButton}>
              <IconPhoto />
              <ImageUploadButtonTypo>인증 사진 업로드</ImageUploadButtonTypo>
            </ImageUploadButton>
            <StopButton onClick={onClickButtonPloggingDone}>
              <IconCheck />
              <StopButtonTypo>플로깅 완료하기</StopButtonTypo>
            </StopButton>
          </ButtonContainer>
        </ContentContainer>
      )}
    </Root>
  )
}
