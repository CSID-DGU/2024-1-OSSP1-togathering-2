import { MEETING_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { NearbyMap } from 'pages/Plogging/nearby/components/NearbyMap'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalStorageMeetingListType, MeetingCategoryType, MeetingListType } from 'types/meeting'
import { getSortedNearbyMeetingList } from 'utils/getSortedNearbyMeetingList'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { ContentContainer, Root, TitleContainer, TitleTypo } from './styled'

type NearbyMeetingSectionProps = {
  className?: string
}

export const NearbyMeetingSection: FC<NearbyMeetingSectionProps> = ({ className }) => {
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

  const centerCoordinate =
    latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 37.55954751374675, lng: 126.99813054145416 }

  // const centerCoordinate = { lat: 37.55954751374675, lng: 126.99813054145416 }

  const startingPoints = (() => {
    // return ALL_MEETING_LIST_SAMPLE.map((item) => item.courseItem.coordinateList[0])
    return meetingList.map((item) => item.courseItem.coordinateList[0])
  })()

  const sortedMeetingList = getSortedNearbyMeetingList(meetingList, centerCoordinate)

  return (
    <Root className={className}>
      <TitleContainer>
        <TitleTypo>우리 동네 예약된 모임</TitleTypo>
      </TitleContainer>
      <ContentContainer>
        <NearbyMap center={centerCoordinate} startingPoints={startingPoints} size={'sm'} />
      </ContentContainer>
      {/* {sortedMeetingList && (
        <ContentContainer>
          {sortedMeetingList.map((meetingItem) => (
            <PloggingMeetingViewer
              meetingItem={meetingItem}
              onSelect={onSelectPloggingMeeting(meetingItem.id, meetingItem.category)}
              key={`plogging_meeting_viewer_${meetingItem.id}`}
            />
          ))}
        </ContentContainer>
      )} */}
    </Root>
  )
}
