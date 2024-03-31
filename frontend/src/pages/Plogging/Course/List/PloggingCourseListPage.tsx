import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { PloggingCourseViewer } from '../Create/components/PloggingCourseViewer'
import { ContentButton, ContentButtonContainer, CourseContainer, Root, TitleContainer, TitleTypo } from './styled'

type PloggingCourseListPageProps = {
  className?: string
}

export const PloggingCourseListPage: FC<PloggingCourseListPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  const onClickButtonPlogginCourseCreate = () => {
    navigate('/plogging/course/create')
    return
  }

  useEffect(() => {
    let newCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (newCourseList) {
      setCourseList(JSON.parse(newCourseList).courseList)
    }
  }, [courseList, setCourseList])

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
      <CourseContainer>
        {courseList.map((courseItem, index) => (
          <PloggingCourseViewer courseItem={courseItem} key={`plogging_course_viewer_${index}`} />
        ))}
      </CourseContainer>
    </Root>
  )
}
