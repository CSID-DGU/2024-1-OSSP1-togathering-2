import { CourseCard } from 'components/CourseCard'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC } from 'react'
import { CourseContainer, Root, TitleTypo } from './styled'

type PopularCourseSectionProps = {
  className?: string
}

export const PopularCourseSection: FC<PopularCourseSectionProps> = ({ className }) => {
  const washedCourseList = (() => {
    let newCourseList = PLOGGING_COURSE_LIST_SAMPLE.courseList
    return newCourseList
  })().filter((_, index) => index < 8)

  return (
    <Root className={className}>
      <TitleTypo>요즘 핫한 코스</TitleTypo>
      <CourseContainer>
        {washedCourseList.map((CourseItem) => (
          <CourseCard courseItem={CourseItem} key={`meeting_card_${CourseItem.id}`} />
        ))}
      </CourseContainer>
    </Root>
  )
}
