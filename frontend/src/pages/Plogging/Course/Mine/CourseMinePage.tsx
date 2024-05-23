import { PlusCircleOutlined } from '@ant-design/icons'
import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { MY_COURSE_LIST_KEY, PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { PloggingCourseViewer } from '../Create/components/PloggingCourseViewer'
import {
  ContentContainer,
  CreateCourseButton,
  CreateCourseButtonTypo,
  PloggingCourseViewerWrapper,
  Root,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type CourseMinePageProps = {
  className?: string
}

export const CourseMinePage: FC<CourseMinePageProps> = ({ className }) => {
  const navigate = useNavigate()
  const onSelectPloggingCourse = (id: number) => () => {
    navigate('/solo/confirm', { state: { ploggingCourseId: id } })
  }
  const [courseList, setCourseList] = useState<CourseListType>([])
  const [myCourseIdList, setMyCourseIdList] = useState<number[]>([])

  const onClickCreateCourseButton = () => {
    navigate('/course/create')
    return
  }

  useEffect(() => {
    let currentMyCourseIdList = loadLocalStorage(MY_COURSE_LIST_KEY)
    if (typeof currentMyCourseIdList === 'string') {
      let newCurrentMyCourseIdList = JSON.parse(currentMyCourseIdList) as number[]
      setMyCourseIdList(newCurrentMyCourseIdList)
      let currentCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
      if (typeof currentCourseList === 'string') {
        const newCourseList = JSON.parse(currentCourseList).courseList as CourseListType
        setCourseList(newCourseList.filter((courseItem) => newCurrentMyCourseIdList.includes(courseItem.id)))
      }
    }
  }, [])

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>반가워요, 교수님</TitleTypo>
        <SubtitleTypo>우리가 만든 코스에요!</SubtitleTypo>
      </TitleContainer>

      <CreateCourseButton type={'primary'} onClick={onClickCreateCourseButton}>
        <PlusCircleOutlined />
        <CreateCourseButtonTypo>나만의 코스 만들기</CreateCourseButtonTypo>
      </CreateCourseButton>
      <ContentContainer>
        {courseList.map((courseItem, index) => (
          <PloggingCourseViewerWrapper
            key={`plogging_course_viewer_${index}`}
            onClick={onSelectPloggingCourse(courseItem.id)}
          >
            <PloggingCourseViewer courseItem={courseItem} />
          </PloggingCourseViewerWrapper>
        ))}
        {courseList.length === 0 ||
          (myCourseIdList.length === 0 && <SubtitleTypo>나만의 코스가 없어요 ㅠㅠ</SubtitleTypo>)}
      </ContentContainer>
      <TabBar />
    </Root>
  )
}
