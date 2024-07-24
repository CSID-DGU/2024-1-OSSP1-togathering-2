import { IconCheck, IconPhoto } from '@tabler/icons-react'
import { getCourseList } from 'apis/course/getCourseList'
import { Header } from 'components/Header'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { getTotalDistance, getTotalDuration } from 'utils/getCourseItemInfo'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
import {
  ButtonContainer,
  ContentContainer,
  ContentDivider,
  FinishButton,
  FinishButtonTypo,
  ImageUploadButton,
  ImageUploadButtonTypo,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  QuestionContainer,
  QuestionItemContainer,
  QuestionItemContentTypo,
  QuestionItemRatingContainer,
  QuestionItemRatingIconStarFilled,
  QuestionItemRatingIconTrashFilled,
  QuestionItemTitleTypo,
  Root,
  SubtitleTypo,
} from './styled'

type PloggingSoloReviewPageProps = {
  className?: string
}

export const PloggingSoloReviewPage: FC<PloggingSoloReviewPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingCourseId, selectedCategory } = state
  const navigate = useNavigate()
  const [ratingList, setRatingList] = useState<[number, number]>([0, 0])
  const [courseList, setCourseList] = useState<CourseListType>([])

  const selectedPloggingCourseItem =
    courseList.filter((courseItem) => courseItem.id === ploggingCourseId).length > 0
      ? courseList.filter((courseItem) => courseItem.id === ploggingCourseId)[0]
      : null

  const onChangeRating = (id: number, value: number) => () => {
    setRatingList((prevRatingList) => {
      return prevRatingList.map((prevRatingItem, index) => (id === index ? value : prevRatingItem)) as [number, number]
    })
  }

  const onClickFinishButton = () => {
    navigate('/')
  }

  let totalDistance = selectedPloggingCourseItem ? getTotalDistance(selectedPloggingCourseItem.coordinateList) : null
  let totalDuration =
    selectedPloggingCourseItem && selectedCategory && totalDistance
      ? getTotalDuration(selectedCategory, totalDistance)
      : null

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

  return (
    <Root className={className}>
      <Header title={'혼자하기 결과'} />
      <SubtitleTypo>
        {`오늘의 ${getMeetingCategoryLabel(selectedCategory)}으로`} <br />
        더욱 건강해졌어요!
      </SubtitleTypo>
      <ContentContainer>
        <InfoContainer>
          <InfoItemContainer isDivided>
            <InfoItemTitleTypo>이동한 거리</InfoItemTitleTypo>
            <InfoItemContentTypo>298m / {totalDistance}m</InfoItemContentTypo>
          </InfoItemContainer>
          <InfoItemContainer isDivided>
            <InfoItemTitleTypo>시간</InfoItemTitleTypo>
            <InfoItemContentTypo>00:07:34</InfoItemContentTypo>
          </InfoItemContainer>
        </InfoContainer>
        <InfoContainer>
          {selectedCategory === 'PLOGGING' ? (
            <>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>제보한 쓰레기</InfoItemTitleTypo>
                <InfoItemContentTypo>2개</InfoItemContentTypo>
              </InfoItemContainer>
              <InfoItemContainer isDivided>
                <InfoItemTitleTypo>획득한 점수</InfoItemTitleTypo>
                <InfoItemContentTypo>10점</InfoItemContentTypo>
              </InfoItemContainer>
            </>
          ) : (
            <InfoItemContainer>
              <InfoItemTitleTypo>획득한 점수</InfoItemTitleTypo>
              <InfoItemContentTypo>{totalDuration?.minute ? totalDuration.minute * 2 : 4}점</InfoItemContentTypo>
            </InfoItemContainer>
          )}
        </InfoContainer>
        <ButtonContainer>
          <ImageUploadButton type={'primary'}>
            <IconPhoto />
            <ImageUploadButtonTypo> 이미지 공유</ImageUploadButtonTypo>
          </ImageUploadButton>
        </ButtonContainer>
        <ContentDivider />
        <QuestionContainer>
          <QuestionItemContainer>
            <QuestionItemTitleTypo>
              이 {getMeetingCategoryLabel(selectedCategory)} 코스를 추천하나요?
            </QuestionItemTitleTypo>
            <QuestionItemRatingContainer>
              <QuestionItemContentTypo>비추</QuestionItemContentTypo>
              {[0, 1, 2, 3, 4].map((value, index) => (
                <QuestionItemRatingIconStarFilled
                  isFilled={ratingList[0] >= value}
                  onClick={onChangeRating(0, value)}
                  key={`question_item_rating_${index}`}
                />
              ))}
              <QuestionItemContentTypo>추천</QuestionItemContentTypo>
            </QuestionItemRatingContainer>
          </QuestionItemContainer>
          <QuestionItemContainer>
            <QuestionItemTitleTypo>
              이 {getMeetingCategoryLabel(selectedCategory)} 코스는 쓰레기가 많았나요?
            </QuestionItemTitleTypo>
            <QuestionItemRatingContainer>
              <QuestionItemContentTypo>많음</QuestionItemContentTypo>
              {[0, 1, 2, 3, 4].map((value, index) => (
                <QuestionItemRatingIconTrashFilled
                  isFilled={ratingList[1] >= value}
                  onClick={onChangeRating(1, value)}
                  key={`question_item_rating_${index}`}
                />
              ))}
              <QuestionItemContentTypo>적음</QuestionItemContentTypo>
            </QuestionItemRatingContainer>
          </QuestionItemContainer>
        </QuestionContainer>
      </ContentContainer>
      <FinishButton onClick={onClickFinishButton} type={'primary'}>
        <IconCheck color={'white'} />
        <FinishButtonTypo>마무리하기</FinishButtonTypo>
      </FinishButton>
    </Root>
  )
}
