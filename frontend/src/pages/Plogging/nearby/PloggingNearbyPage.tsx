import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { MEETING_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalStorageMeetingListType, MeetingCategoryType, MeetingListType } from 'types/meeting'
import { getNearByMeetingList } from 'utils/getNearByMeetingList'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { PloggingMeetingViewer } from '../components/PloggingMeetingViewer'
import { NearbyMap } from './components/NearbyMap'
import { ContentContainer, Root, SubtitleTypo, TitleContainer, TitleTypo } from './styled'

type PloggingNearbyPageProps = {
  className?: string
}

export const PloggingNearbyPage: FC<PloggingNearbyPageProps> = ({ className }) => {
  const [meetingList, setMeetingList] = useState<MeetingListType>(ALL_MEETING_LIST_SAMPLE)
  const [latitude, setLatitude] = useState<any>(null)
  const [longitude, setLongitude] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate()

  const onSelectPloggingMeeting = (id: number, category: MeetingCategoryType) => () => {
    navigate('/meeting/confirm', { state: { ploggingMeetingId: id, selectedCategory: category } })
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
    let currentMeetingList = loadLocalStorage(MEETING_LIST_KEY)
    if (typeof currentMeetingList === 'string') {
      let parseMeetingList = JSON.parse(currentMeetingList) as LocalStorageMeetingListType
      let newMeetingList = parseMeetingList.meetingList
      setMeetingList(newMeetingList)
    }
  }, [])

  // const centerCoordinate =
  //   latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 37.55954751374675, lng: 126.99813054145416 }

  const centerCoordinate = { lat: 37.55954751374675, lng: 126.99813054145416 }

  const startingPoints = (() => {
    // return ALL_MEETING_LIST_SAMPLE.map((item) => item.courseItem.coordinateList[0])
    return meetingList.map((item) => item.courseItem.coordinateList[0])
  })()

  const sortedMeetingList = getNearByMeetingList(meetingList, centerCoordinate)

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>안녕하세요, 교수님</TitleTypo>
        <SubtitleTypo>근처에 있는 활동을 모아봤어요!</SubtitleTypo>
      </TitleContainer>
      <ContentContainer>
        <NearbyMap center={centerCoordinate} startingPoints={startingPoints} />
      </ContentContainer>
      {sortedMeetingList && (
        <ContentContainer>
          {sortedMeetingList.map((meetingItem) => (
            <PloggingMeetingViewer
              meetingItem={meetingItem}
              onSelect={onSelectPloggingMeeting(meetingItem.id, meetingItem.category)}
              key={`plogging_meeting_viewer_${meetingItem.id}`}
            />
          ))}
        </ContentContainer>
      )}
      <TabBar />
    </Root>
  )
}
