import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentButton, ContentButtonContainer, CourseContainer, Root, TitleContainer, TitleTypo } from './styled'

type PloggingCourseListPageProps = {
  className?: string
}

export const PloggingCourseListPage: FC<PloggingCourseListPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickButtonPlogginCourseCreate = () => {
    navigate('/plogging/course/create')
    return
  }

  return (
    <Root className={className}>
      <TitleContainer>
        <TitleTypo>플로깅 코스 추천받기</TitleTypo>
      </TitleContainer>
      <ContentButtonContainer>
        <ContentButton type={'primary'} onClick={onClickButtonPlogginCourseCreate}>
          플로깅 코스 만들기
        </ContentButton>
      </ContentButtonContainer>
      <CourseContainer>플로깅 코스 리스트</CourseContainer>
    </Root>
  )
}
