import { Header } from 'components/Header'
import { SelectPloggingCourse } from 'pages/Plogging/components/SelectPloggingCourse'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentContainer, Root, SubtitleCircle, SubtitleCircleTypo, SubtitleContainer, SubtitleTypo } from './styled'

type PloggingMeetingCreateCoursePageProps = {
  className?: string
}

export const PloggingMeetingCreateCoursePage: FC<PloggingMeetingCreateCoursePageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onSelectPloggingCourse = (id: number) => {
    navigate('/plogging/meeting/create/info', { state: { ploggingCourseId: id } })
  }

  return (
    <Root className={className}>
      <Header title={'함께하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        <SubtitleTypo>어떤 코스에서 즐겨볼까요?</SubtitleTypo>
      </SubtitleContainer>
      <ContentContainer>
        <SelectPloggingCourse onSelectPloggingCourse={onSelectPloggingCourse} />
      </ContentContainer>
    </Root>
  )
}
