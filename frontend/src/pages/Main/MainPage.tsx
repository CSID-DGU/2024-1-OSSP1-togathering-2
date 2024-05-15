import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from 'components/Header'
import { StartingPointsMap } from 'components/StartingPointsMap'
import { TabBar } from 'components/TabBar'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CurrentHistoryCard,
  CurrentHistoryCardContainer,
  CurrentHistoryCardContentTypo,
  CurrentHistoryCardTitleArrowIcon,
  CurrentHistoryCardTitleContainer,
  CurrentHistoryCardTitleTypo,
  CurrentHistoryContainer,
  CurrentHistoryTitleTypo,
  PloggingMapButton,
  PloggingMapButtonContainer,
  PloggingMapContainer,
  PloggingMapTitleContainer,
  PloggingMapTitleTypo,
  PloggingMapWrapper,
  PloggingMeetingCard,
  PloggingMeetingCardContainer,
  PloggingMeetingCardContentTypo,
  PloggingMeetingCardTitleArrowIcon,
  PloggingMeetingCardTitleContainer,
  PloggingMeetingCardTitleTypo,
  PloggingMeetingContainer,
  PloggingMeetingTitleContainer,
  PloggingMeetingTitleTypo,
  Root,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type MainPageProps = {
  className?: string
}

const currentHistoryCardDataList = [
  {
    title: '나의 플로깅 순위는',
    content: '12.8%',
  },
  {
    title: '4월 플로깅 횟수',
    content: '2회',
  },
  {
    title: '나만의 코스 스크랩',
    content: '4개',
  },
]

const ploggingMeetingCardDataList = [
  {
    title: '플로깅 집중 모임',
    content: '4/10',
  },
  {
    title: '젊은이들끼리 즐겨요!',
    content: '2/2',
  },
  {
    title: '비건들의 모험',
    content: '1/4',
  },
]

export const MainPage: FC<MainPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickButtonPloggingCourseList = () => {
    navigate('/plogging/course/list')
    return
  }

  const onClickButtonPloggingGroupCreate = () => {
    return
  }

  const onClickButtonPloggingGroupJoin = () => {
    return
  }

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>반가워요, 교수님</TitleTypo>
        <SubtitleTypo>모두가 함께 건강한 거리를 만들어요!</SubtitleTypo>
      </TitleContainer>
      <CurrentHistoryContainer>
        <CurrentHistoryTitleTypo>4월</CurrentHistoryTitleTypo>
        <CurrentHistoryCardContainer>
          {currentHistoryCardDataList.map((cardItem, index) => (
            <CurrentHistoryCard key={`current_history_card_${index}`}>
              <CurrentHistoryCardTitleContainer>
                <CurrentHistoryCardTitleTypo>{cardItem.title}</CurrentHistoryCardTitleTypo>
                <CurrentHistoryCardTitleArrowIcon />
              </CurrentHistoryCardTitleContainer>
              <CurrentHistoryCardContentTypo>{cardItem.content}</CurrentHistoryCardContentTypo>
            </CurrentHistoryCard>
          ))}
        </CurrentHistoryCardContainer>
      </CurrentHistoryContainer>
      <PloggingMapContainer>
        <PloggingMapTitleContainer>
          <PloggingMapTitleTypo>우리 동네에 예정되어 있는 플로깅</PloggingMapTitleTypo>
        </PloggingMapTitleContainer>
        <PloggingMapWrapper>
          <StartingPointsMap
            center={{ lat: 37.55954751374675, lng: 126.99813054145416 }}
            startingPoints={[
              { lat: 37.55954751374675, lng: 126.99813054145416 },
              { lat: 37.5580558199932, lng: 126.998311394625 },
            ]}
          />
        </PloggingMapWrapper>
        <PloggingMapButtonContainer>
          <PloggingMapButton
            primary={true}
            icon={() => <UserOutlined />}
            text="혼자 시작"
            href="/plogging/solo/create"
          />
          <PloggingMapButton primary={true} icon={() => <TeamOutlined />} text="함께 시작" href="/plogging/meeting" />
        </PloggingMapButtonContainer>
      </PloggingMapContainer>
      <PloggingMeetingContainer>
        <PloggingMeetingTitleContainer>
          <PloggingMeetingTitleTypo>가장 빨리 시작하는 모임</PloggingMeetingTitleTypo>
        </PloggingMeetingTitleContainer>
        <PloggingMeetingCardContainer>
          {ploggingMeetingCardDataList.map((cardItem, index) => (
            <PloggingMeetingCard key={`plogging_meeting_card_${index}`}>
              <PloggingMeetingCardTitleContainer>
                <PloggingMeetingCardTitleTypo>{cardItem.title}</PloggingMeetingCardTitleTypo>
                <PloggingMeetingCardTitleArrowIcon />
              </PloggingMeetingCardTitleContainer>
              <PloggingMeetingCardContentTypo>{cardItem.content}</PloggingMeetingCardContentTypo>
            </PloggingMeetingCard>
          ))}
        </PloggingMeetingCardContainer>
      </PloggingMeetingContainer>
      <TabBar />
    </Root>
  )
}
