import { IconCheck, IconPhoto } from '@tabler/icons-react'
import { getCourseList } from 'apis/course/getCourseList'
import { Header } from 'components/Header'
import { useBooleanState } from 'hooks/useBooleanState'
import { PloggingCourseViewer } from 'pages/Plogging/Course/Create/components/PloggingCourseViewer'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { getTotalDistance, getTotalDuration } from 'utils/getCourseItemInfo'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
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
  const { ploggingCourseId, selectedCategory } = state
  const navigate = useNavigate()
  const { state: isSimulating, setTrue: startSimulate, setFalse: stopSimulate } = useBooleanState(false)

  const [courseList, setCourseList] = useState<CourseListType>([])

  useEffect(() => {
    getCourseList({}).then((res) => {
      if (res) {
        const newCourseList = res.data.result.map((value) => ({
          id: value.course_id,
          name: value.title,
          coordinateList: JSON.parse(value.metadata),
        }))
        setCourseList(newCourseList)
      }
    })
  }, [])

  const selectedPloggingCourseItem =
    courseList.filter((courseItem) => courseItem.id === ploggingCourseId).length > 0
      ? courseList.filter((courseItem) => courseItem.id === ploggingCourseId)[0]
      : null

  const onClickTestButton = () => {
    startSimulate()
    return
  }
  const onClickButtonPloggingDone = () => {
    navigate('/solo/review', { state })
    return
  }

  let totalDistance = selectedPloggingCourseItem ? getTotalDistance(selectedPloggingCourseItem.coordinateList) : null
  let totalDuration =
    selectedPloggingCourseItem && selectedCategory && totalDistance
      ? getTotalDuration(selectedCategory, totalDistance)
      : null

  return (
    <Root className={className}>
      <Header showLogo />
      <SubtitleTypo>
        모두 함께 아자아자 파이팅!
        <br />
        오늘의 활동으로 건강해지고 있어요!
      </SubtitleTypo>
      {selectedPloggingCourseItem && totalDuration && totalDistance && (
        <ContentContainer>
          <PloggingCourseViewer
            isDetail={true}
            courseItem={selectedPloggingCourseItem}
            isSimulating={isSimulating}
            stopSimulate={stopSimulate}
          />
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>이동한 거리</InfoItemTitleTypo>
              <InfoItemContentTypo>0m / {`${totalDistance}m`}</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>시간</InfoItemTitleTypo>
              <InfoItemContentTypo>
                {totalDuration.minute}분 {totalDuration.second}초
              </InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          {selectedCategory === 'PLOGGING' ? (
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
          ) : (
            <InfoContainer>
              <InfoItemContainer>
                <InfoItemTitleTypo>획득한 점수</InfoItemTitleTypo>
                <InfoItemContentTypo>{totalDuration.minute * 2}점</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
          )}
          <ButtonContainer>
            <ImageUploadButton type={'primary'} onClick={onClickTestButton}>
              <IconPhoto />
              <ImageUploadButtonTypo>인증 사진 업로드</ImageUploadButtonTypo>
            </ImageUploadButton>
            <StopButton onClick={onClickButtonPloggingDone}>
              <IconCheck />
              <StopButtonTypo>{`${getMeetingCategoryLabel(selectedCategory)} 완료하기`}</StopButtonTypo>
            </StopButton>
          </ButtonContainer>
        </ContentContainer>
      )}
    </Root>
  )
}
