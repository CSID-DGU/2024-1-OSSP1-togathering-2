import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from 'components/Header'
import { StartingPointsMap } from 'components/StartingPointsMap'
import { TabBar } from 'components/TabBar'
import { MEETING_LIST_KEY, PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadLocalStorage, saveLocalStorage } from 'utils/handleLocalStorage'
import { LatestMeetingSection } from './components/LatestMeetingSection'
import { PopularCourseSection } from './components/PopularCourseSection'
import {
  PloggingMapButton,
  PloggingMapButtonContainer,
  PloggingMapContainer,
  PloggingMapTitleContainer,
  PloggingMapTitleTypo,
  PloggingMapWrapper,
  Root,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type MainPageProps = {
  className?: string
}

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

  useEffect(() => {
    let currentCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (typeof currentCourseList !== 'string') {
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(PLOGGING_COURSE_LIST_SAMPLE))
    }
    let currentMeetingList = loadLocalStorage(MEETING_LIST_KEY)
    if (typeof currentMeetingList !== 'string') {
      saveLocalStorage(MEETING_LIST_KEY, JSON.stringify({ meetingList: ALL_MEETING_LIST_SAMPLE }))
    }
  }, [])

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>반가워요, 교수님</TitleTypo>
        <SubtitleTypo>오늘은 무슨 활동에 참여할까요?</SubtitleTypo>
      </TitleContainer>
      <PloggingMapContainer>
        <PloggingMapTitleContainer>
          <PloggingMapTitleTypo>우리 동네에 예정되어 있는 모임</PloggingMapTitleTypo>
        </PloggingMapTitleContainer>
        <PloggingMapWrapper>
          <StartingPointsMap
            center={{ lat: 37.55954751374675, lng: 126.99813054145416 }}
            startingPoints={[
              { lat: 37.55954751374675, lng: 126.99813054145416 },
              { lat: 37.5580558199932, lng: 126.998311394625 },
              {
                lng: 126.9887176826959,
                lat: 37.55345638628968,
              },
              {
                lng: 126.99848330927826,
                lat: 37.55876427780856,
              },
              {
                lng: 126.99916658554937,
                lat: 37.558580978053875,
              },
              {
                lng: 126.936261303681,
                lat: 37.55516358086798,
              },
              {
                lng: 129.16146889673206,
                lat: 35.159599888896906,
              },
            ]}
          />
        </PloggingMapWrapper>
        <PloggingMapButtonContainer>
          <PloggingMapButton
            primary={true}
            icon={() => <UserOutlined />}
            text="혼자 시작"
            href="/plogging/solo/course"
          />
          <PloggingMapButton
            primary={true}
            icon={() => <TeamOutlined />}
            text="함께 시작"
            href="/plogging/meeting/list"
          />
        </PloggingMapButtonContainer>
      </PloggingMapContainer>
      <LatestMeetingSection />
      <PopularCourseSection />
      <TabBar />
    </Root>
  )
}
