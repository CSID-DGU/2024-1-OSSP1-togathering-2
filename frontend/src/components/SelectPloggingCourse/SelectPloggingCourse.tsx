import { PlusCircleOutlined } from '@ant-design/icons'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { PloggingCourseViewer } from 'pages/Plogging/Course/Create/components/PloggingCourseViewer'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { CourseContainer, CreateCourseButton, CreateCourseButtonTypo, Root } from './styled'

type SelectPloggingCourseProps = {
  className?: string
}

export const SelectPloggingCourse: FC<SelectPloggingCourseProps> = ({ className }) => {
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  const onSelectPloggingCourse = (id: number) => () => {
    navigate('/plogging/solo/confirm', { state: { ploggingCourseId: id } })
    return
  }

  const onClickCreateCourseButton = () => {
    navigate('/plogging/course/create')
  }

  useEffect(() => {
    let newCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (newCourseList) {
      if (courseList.length !== 0) {
        setCourseList(JSON.parse(newCourseList).courseList)
      }
    } else {
      setCourseList(PLOGGING_COURSE_LIST_SAMPLE.courseList)
    }
  }, [courseList, setCourseList])

  if (courseList.length === 0) {
    return <span />
  }

  return (
    <Root className={className}>
      <CourseContainer>
        {courseList.map((courseItem) => (
          <PloggingCourseViewer
            courseItem={courseItem}
            onSelect={onSelectPloggingCourse(courseItem.id)}
            key={`plogging_course_viewer_${courseItem.id}`}
          />
        ))}
      </CourseContainer>
      <CreateCourseButton type={'primary'} onClick={onClickCreateCourseButton}>
        <PlusCircleOutlined />
        <CreateCourseButtonTypo>나만의 플로깅 코스 만들기</CreateCourseButtonTypo>
      </CreateCourseButton>
    </Root>
  )
}
