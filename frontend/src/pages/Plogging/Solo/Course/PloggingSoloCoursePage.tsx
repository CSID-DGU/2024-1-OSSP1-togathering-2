import { Header } from 'components/Header'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectPloggingCourse } from '../../components/SelectPloggingCourse'
import { ContentContainer, Root, SubtitleCircle, SubtitleCircleTypo, SubtitleContainer, SubtitleTypo } from './styled'

type PloggingSoloCoursePageProps = {
  className?: string
}

export const PloggingSoloCoursePage: FC<PloggingSoloCoursePageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onSelectPloggingCourse = (id: number) => {
    navigate('/plogging/solo/confirm', { state: { ploggingCourseId: id } })
  }

  return (
    <Root className={className}>
      <Header title={'플로깅 혼자하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        <SubtitleTypo>어떤 코스에서 플로깅을 즐겨볼까요?</SubtitleTypo>
      </SubtitleContainer>
      <ContentContainer>
        <SelectPloggingCourse onSelectPloggingCourse={onSelectPloggingCourse} />
      </ContentContainer>
    </Root>
  )
}
