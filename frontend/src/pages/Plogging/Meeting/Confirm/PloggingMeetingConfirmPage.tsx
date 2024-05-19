import { Header } from 'components/Header'
import { FC, useState } from 'react'
import {
  ButtonContainer,
  ContentContainer,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  MeetingPersonAvatar,
  MeetingPersonCard,
  MeetingPersonContainer,
  MeetingPersonInfoTypo,
  MeetingPersonLeaderChip,
  Root,
  StartButton,
  StartButtonTypo,
  SubtitleContainer,
  SubtitleTypo,
} from './styled'

import { IconCrown, IconUser } from '@tabler/icons-react'
import { SELECTED_MEETING_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import dayjs from 'dayjs'
import { PloggingMeetingViewer } from 'pages/Plogging/components/PloggingMeetingViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import { lightTheme } from 'styles/theme'
import { LocalSelectedMeetingListType, MeetingListType } from 'types/meeting'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
import { loadLocalStorage, saveLocalStorage } from 'utils/handleLocalStorage'

type PloggingMeetingConfirmPageProps = {
  className?: string
}

export const PloggingMeetingConfirmPage: FC<PloggingMeetingConfirmPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingMeetingId, selectedCategory } = state
  const navigate = useNavigate()
  const [meetingList] = useState<MeetingListType>(ALL_MEETING_LIST_SAMPLE)

  const selectedPloggingMeetingItem =
    meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId).length > 0
      ? meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId)[0]
      : null

  const onClickStartButton = () => {
    let currentSelectedMeetingList: LocalSelectedMeetingListType =
      typeof loadLocalStorage(SELECTED_MEETING_LIST_KEY) === 'string'
        ? (JSON.parse(loadLocalStorage(SELECTED_MEETING_LIST_KEY) as string) as LocalSelectedMeetingListType)
        : { selectedMeetingList: [] }
    currentSelectedMeetingList.selectedMeetingList = [
      ...currentSelectedMeetingList.selectedMeetingList,
      { id: ploggingMeetingId },
    ]
    saveLocalStorage(SELECTED_MEETING_LIST_KEY, JSON.stringify(currentSelectedMeetingList))
    navigate('/plogging/meeting/scheduled')
  }

  return (
    <Root className={className}>
      <Header title={'함께하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleTypo>{`${getMeetingCategoryLabel(selectedCategory)} 모임 정보를 확인해주세요.`}</SubtitleTypo>
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
                <InfoItemTitleTypo>카테고리</InfoItemTitleTypo>
                <InfoItemContentTypo>
                  {getMeetingCategoryLabel(selectedPloggingMeetingItem.category)}
                </InfoItemContentTypo>
              </InfoItemContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>일시</InfoItemTitleTypo>
                <InfoItemContentTypo style={{ fontSize: 12, height: 30, paddingTop: 10 }}>
                  {dayjs(selectedPloggingMeetingItem.startAt).format('YYYY.MM.DD A HH:mm')}
                </InfoItemContentTypo>
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
            <InfoContainer>
              <InfoItemContainer>
                <InfoItemTitleTypo>모인 인원</InfoItemTitleTypo>
                <MeetingPersonContainer>
                  <MeetingPersonCard>
                    <MeetingPersonAvatar>
                      <IconUser size={14} color={lightTheme.colors.base['700']} />
                    </MeetingPersonAvatar>
                    <MeetingPersonInfoTypo>아마추어 개발자</MeetingPersonInfoTypo>
                    <MeetingPersonLeaderChip>
                      <IconCrown size={12} color={lightTheme.colors.base['50']} style={{ marginTop: 4 }} />
                    </MeetingPersonLeaderChip>
                  </MeetingPersonCard>
                  <MeetingPersonCard>
                    <MeetingPersonAvatar>
                      <IconUser size={14} color={lightTheme.colors.base['700']} />
                    </MeetingPersonAvatar>
                    <MeetingPersonInfoTypo>학사 운영실 정차장님</MeetingPersonInfoTypo>
                  </MeetingPersonCard>
                  <MeetingPersonCard>
                    <MeetingPersonAvatar>
                      <IconUser size={14} color={lightTheme.colors.base['700']} />
                    </MeetingPersonAvatar>
                    <MeetingPersonInfoTypo>정교수님</MeetingPersonInfoTypo>
                  </MeetingPersonCard>
                  <MeetingPersonCard>
                    <MeetingPersonAvatar>
                      <IconUser size={14} color={lightTheme.colors.base['700']} />
                    </MeetingPersonAvatar>
                    <MeetingPersonInfoTypo>이태환 학생</MeetingPersonInfoTypo>
                  </MeetingPersonCard>
                </MeetingPersonContainer>
              </InfoItemContainer>
            </InfoContainer>
          </ContentContainer>
          <ButtonContainer>
            <StartButton type={'primary'} onClick={onClickStartButton}>
              <StartButtonTypo> 모임 참여하기</StartButtonTypo>
            </StartButton>
          </ButtonContainer>
        </>
      )}
    </Root>
  )
}
