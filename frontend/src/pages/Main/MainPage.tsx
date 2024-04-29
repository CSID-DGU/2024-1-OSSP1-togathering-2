import { Header } from 'components/Header'
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
    </Root>
  )
}
