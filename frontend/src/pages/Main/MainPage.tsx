import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from 'components/Header'
import { StartingPointsMap } from 'components/StartingPointsMap'
import { TabBar } from 'components/TabBar'
import { MEETING_LIST_KEY, PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalStorageMeetingListType, MeetingListType } from 'types/meeting'
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
  const [meetingList, setMeetingList] = useState<MeetingListType>([])
  const [latitude, setLatitude] = useState<any>(null)
  const [longitude, setLongitude] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const onClickButtonPloggingCourseList = () => {
    navigate('/course/list')
    return
  }

  const onClickButtonPloggingGroupCreate = () => {
    return
  }

  const onClickButtonPloggingGroupJoin = () => {
    return
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        (error) => {
          setError(error.message)
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    getLocation()
    let currentCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (typeof currentCourseList !== 'string') {
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(PLOGGING_COURSE_LIST_SAMPLE))
    }
    let currentMeetingList = loadLocalStorage(MEETING_LIST_KEY)
    if (typeof currentMeetingList !== 'string') {
      saveLocalStorage(MEETING_LIST_KEY, JSON.stringify({ meetingList: ALL_MEETING_LIST_SAMPLE }))
    } else {
      let parseMeetingList = JSON.parse(currentMeetingList) as LocalStorageMeetingListType
      let newMeetingList = parseMeetingList.meetingList
      setMeetingList(newMeetingList)
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
            center={{ lat: latitude, lng: longitude }}
            startingPoints={meetingList.map((meetingItem) => meetingItem.courseItem.coordinateList[0])}
          />
        </PloggingMapWrapper>
        <PloggingMapButtonContainer>
          <PloggingMapButton primary={true} icon={() => <UserOutlined />} text="혼자 시작" href="/solo/course" />
          <PloggingMapButton primary={true} icon={() => <TeamOutlined />} text="함께 시작" href="/meeting/list" />
        </PloggingMapButtonContainer>
      </PloggingMapContainer>
      <LatestMeetingSection />
      <PopularCourseSection />
      <TabBar />
    </Root>
  )
}
