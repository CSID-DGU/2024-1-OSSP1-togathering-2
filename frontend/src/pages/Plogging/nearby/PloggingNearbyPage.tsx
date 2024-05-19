import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { FC, useEffect, useState } from 'react'
import { PLOGGING_COURSE_LIST_SAMPLE } from '../Course/Create/constant'
import { NearbyMap } from './components/NearbyMap'
import { ContentContainer, Root, SubtitleTypo, TitleContainer, TitleTypo } from './styled'

type PloggingNearbyPageProps = {
  className?: string
}

export const PloggingNearbyPage: FC<PloggingNearbyPageProps> = ({ className }) => {
  const [latitude, setLatitude] = useState<any>(null)
  const [longitude, setLongitude] = useState<any>(null)
  const [error, setError] = useState<any>(null)

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
  }, [])

  const centerCoordinate =
    latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 37.55954751374675, lng: 126.99813054145416 }

  const startingPoints = (() => {
    // return ALL_MEETING_LIST_SAMPLE.map((item) => item.courseItem.coordinateList[0])
    return PLOGGING_COURSE_LIST_SAMPLE.courseList.map((item) => item.coordinateList[0])
  })()

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
      <TabBar />
    </Root>
  )
}