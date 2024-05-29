import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage, saveLocalStorage } from 'utils/handleLocalStorage'
import { PloggingCourseViewer } from '../Create/components/PloggingCourseViewer'
import { PLOGGING_COURSE_LIST_SAMPLE } from '../Create/constant'
import { ContentButton, ContentButtonContainer, CourseContainer, Root, TitleContainer, TitleTypo } from './styled'

type PloggingCourseListPageProps = {
  className?: string
}

export const PloggingCourseListPage: FC<PloggingCourseListPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  const onClickButtonPlogginCourseCreate = () => {
    navigate('/course/create')
    return
  }

  useEffect(() => {
    let newCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (newCourseList) {
      if (courseList.length === 0) {
        setCourseList(JSON.parse(newCourseList).courseList)
      }
    } else {
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(PLOGGING_COURSE_LIST_SAMPLE))
      setCourseList(PLOGGING_COURSE_LIST_SAMPLE.courseList)
    }
  }, [courseList, setCourseList])

  return (
    <Root className={className}>
      <TitleContainer>
        <TitleTypo>코스 추천받기</TitleTypo>
      </TitleContainer>
      <ContentButtonContainer>
        <ContentButton type={'primary'} onClick={onClickButtonPlogginCourseCreate}>
          코스 만들기
        </ContentButton>
      </ContentButtonContainer>
      <CourseContainer>
        {courseList
          .filter((courseItem) => !courseItem?.isHidden)
          .map((courseItem, index) => (
            <PloggingCourseViewer courseItem={courseItem} key={`plogging_course_viewer_${index}`} />
          ))}
      </CourseContainer>
    </Root>
  )
}
