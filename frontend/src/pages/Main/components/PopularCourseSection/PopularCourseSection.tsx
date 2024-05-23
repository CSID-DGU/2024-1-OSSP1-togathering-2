import { CourseCard } from 'components/CourseCard'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCardWrapper, CourseContainer, Root, TitleTypo } from './styled'

type PopularCourseSectionProps = {
  className?: string
}

export const PopularCourseSection: FC<PopularCourseSectionProps> = ({ className }) => {
  const navigate = useNavigate()
  const onSelectPloggingCourse = (id: number) => () => {
    navigate('/solo/confirm', { state: { ploggingCourseId: id } })
  }

  const washedCourseList = (() => {
    let newCourseList = PLOGGING_COURSE_LIST_SAMPLE.courseList
    return newCourseList
  })().filter((_, index) => index < 8)

  return (
    <Root className={className}>
      <TitleTypo>혼자 산책 코스 추천!</TitleTypo>
      <CourseContainer>
        {washedCourseList.map((CourseItem) => (
          <CourseCardWrapper key={`meeting_card_${CourseItem.id}`} onClick={onSelectPloggingCourse(CourseItem.id)}>
            <CourseCard courseItem={CourseItem} />
          </CourseCardWrapper>
        ))}
      </CourseContainer>
    </Root>
  )
}
