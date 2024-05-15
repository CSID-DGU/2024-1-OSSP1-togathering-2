import { IconCheck, IconPhoto } from '@tabler/icons-react'
import { Header } from 'components/Header'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { PloggingCourseViewer } from 'pages/Plogging/Course/Create/components/PloggingCourseViewer'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import {
  ButtonContainer,
  ContentContainer,
  ImageUploadButton,
  ImageUploadButtonTypo,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  Root,
  StopButton,
  StopButtonTypo,
  SubtitleTypo,
} from './styled'

type PloggingSoloProgressPageProps = {
  className?: string
}

export const PloggingSoloProgressPage: FC<PloggingSoloProgressPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingCourseId } = state
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  useEffect(() => {
    let newCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (newCourseList) {
      if (courseList.length === 0) {
        setCourseList(JSON.parse(newCourseList).courseList)
      }
    } else {
      setCourseList(PLOGGING_COURSE_LIST_SAMPLE.courseList)
    }
  }, [courseList, setCourseList])

  const selectedPloggingCourseItem =
    courseList.filter((courseItem) => courseItem.id === ploggingCourseId).length > 0
      ? courseList.filter((courseItem) => courseItem.id === ploggingCourseId)[0]
      : null

  const onClickButtonPloggingDone = () => {
    navigate('/plogging/solo/review')
  }

  return (
    <Root className={className}>
      <Header showLogo />
      <SubtitleTypo>
        교수님 파이팅!
        <br />
        오늘의 플로깅으로 거리가 깨끗해지고 있어요!
      </SubtitleTypo>
      {selectedPloggingCourseItem && (
        <ContentContainer>
          <PloggingCourseViewer isDetail={true} courseItem={selectedPloggingCourseItem} />
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>이동한 거리</InfoItemTitleTypo>
              <InfoItemContentTypo>298m / 1,000m</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>시간</InfoItemTitleTypo>
              <InfoItemContentTypo>00:07:34</InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>제보한 쓰레기</InfoItemTitleTypo>
              <InfoItemContentTypo>2개</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>획득한 점수</InfoItemTitleTypo>
              <InfoItemContentTypo>10점</InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          <ButtonContainer>
            <ImageUploadButton type={'primary'}>
              <IconPhoto />
              <ImageUploadButtonTypo>인증 사진 업로드</ImageUploadButtonTypo>
            </ImageUploadButton>
            <StopButton onClick={onClickButtonPloggingDone}>
              <IconCheck />
              <StopButtonTypo>플로깅 완료하기</StopButtonTypo>
            </StopButton>
          </ButtonContainer>
        </ContentContainer>
      )}
    </Root>
  )
}
