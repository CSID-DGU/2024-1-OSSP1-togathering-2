import { Header } from 'components/Header'
import { FC, useEffect, useState } from 'react'
import {
  ButtonContainer,
  ContentContainer,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  Root,
  StartButton,
  StartButtonTypo,
  SubtitleCircle,
  SubtitleCircleTypo,
  SubtitleContainer,
  SubtitleTypo,
} from './styled'

import { IconRun } from '@tabler/icons-react'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { PloggingCourseViewer } from 'pages/Plogging/Course/Create/components/PloggingCourseViewer'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage } from 'utils/handleLocalStorage'

type PloggingSoloConfirmPageProps = {
  className?: string
}

export const PloggingSoloConfirmPage: FC<PloggingSoloConfirmPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingCourseId } = state
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

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

  const selectedPloggingCourseItem =
    courseList.filter((courseItem) => courseItem.id === ploggingCourseId).length > 0
      ? courseList.filter((courseItem) => courseItem.id === ploggingCourseId)[0]
      : null

  const onClickStartButton = () => {
    navigate('/plogging/alert', { state: { ploggingCourseId } })
  }

  return (
    <Root className={className}>
      <Header title={'플로깅 혼자 진행하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>2</SubtitleCircleTypo>
        </SubtitleCircle>
        <SubtitleTypo>플로깅 정보를 확인해주세요.</SubtitleTypo>
      </SubtitleContainer>
      {selectedPloggingCourseItem && (
        <>
          <PloggingCourseViewer isDetail={true} courseItem={selectedPloggingCourseItem} />
          <ContentContainer>
            <InfoContainer>
              <InfoItemContainer>
                <InfoItemTitleTypo>코스 명</InfoItemTitleTypo>
                <InfoItemContentTypo>{selectedPloggingCourseItem.name}</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
            <InfoContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>총 거리</InfoItemTitleTypo>
                <InfoItemContentTypo>1,000m</InfoItemContentTypo>
              </InfoItemContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>예상 소요 시간</InfoItemTitleTypo>
                <InfoItemContentTypo>12분</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
            <InfoContainer>
              <InfoItemContainer>
                <InfoItemTitleTypo>완주시 얻게 되는 점수</InfoItemTitleTypo>
                <InfoItemContentTypo>24점</InfoItemContentTypo>
              </InfoItemContainer>
            </InfoContainer>
          </ContentContainer>
          <ButtonContainer>
            <StartButton type={'primary'} onClick={onClickStartButton}>
              <IconRun />
              <StartButtonTypo> 바로 시작하기</StartButtonTypo>
            </StartButton>
          </ButtonContainer>
        </>
      )}
    </Root>
  )
}
