import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from 'components/Header'
import { StartingPointsMap } from 'components/StartingPointsMap'
import { TabBar } from 'components/TabBar'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { LatestMeetingSection } from './components/LatestMeetingSection'
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

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>반가워요, 교수님</TitleTypo>
        <SubtitleTypo>오늘은 무슨 활동에 참여할까요?</SubtitleTypo>
      </TitleContainer>
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
      <TabBar />
    </Root>
  )
}
