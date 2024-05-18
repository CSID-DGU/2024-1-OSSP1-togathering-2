import { Header } from 'components/Header'
import { FC, useEffect, useState } from 'react'
import {
  ButtonContainer,
  CategorySelect,
  CategorySelectContainer,
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

export const CREATE_TYPE_SELECT_OPTIONS: { label: string; value: string }[] = [
  // { label: '산책', value: 'WALK' },
  // { label: '러닝', value: 'RUNNING' },
  // { label: '자전거', value: 'BICYCLE' },
  // { label: '플로깅', value: 'PLOGGING' },
  { label: '산책', value: '산책' },
  { label: '러닝', value: '러닝' },
  { label: '자전거', value: '자전거' },
  { label: '플로깅', value: '플로깅' },
]

export const PloggingSoloConfirmPage: FC<PloggingSoloConfirmPageProps> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>()
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

  const onClickStartButton = () => {
    navigate('/plogging/solo/alert', { state: { ploggingCourseId } })
  }

  const onChangeSelectCreateType = (value: any) => {
    setSelectedCategory(value)
    return
  }

  return (
    <Root className={className}>
      <Header title={'혼자하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>2</SubtitleCircleTypo>
        </SubtitleCircle>
        {selectedCategory ? (
          <SubtitleTypo>{`활동 카테고리: ${selectedCategory}`}</SubtitleTypo>
        ) : (
          <SubtitleTypo>활동 카테고리를 입력해주세요.</SubtitleTypo>
        )}
      </SubtitleContainer>
      {!selectedCategory && (
        <CategorySelectContainer>
          <CategorySelect
            size={'large'}
            placeholder="활동 카테고리를 선택해주세요."
            optionFilterProp="children"
            onChange={onChangeSelectCreateType}
            options={CREATE_TYPE_SELECT_OPTIONS}
          />
        </CategorySelectContainer>
      )}
      {selectedCategory && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>3</SubtitleCircleTypo>
            </SubtitleCircle>
            <SubtitleTypo>활동 정보를 확인해주세요.</SubtitleTypo>
          </SubtitleContainer>
          {selectedPloggingCourseItem && (
            <>
              <PloggingCourseViewer isDetail={true} courseItem={selectedPloggingCourseItem} />
              <ContentContainer>
                <InfoContainer>
                  <InfoItemContainer>
                    <InfoItemTitleTypo>코스 이름</InfoItemTitleTypo>
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
        </>
      )}
    </Root>
  )
}
