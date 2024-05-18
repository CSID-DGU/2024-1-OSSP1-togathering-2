import { IconCheck, IconPhoto, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { Header } from 'components/Header'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  QuestionItemButton,
  QuestionItemButtonContainer,
  QuestionItemButtonTypo,
  QuestionItemContainer,
  QuestionItemContentTypo,
  QuestionItemRatingContainer,
  QuestionItemRatingIconStarFilled,
  QuestionItemRatingIconTrashFilled,
  QuestionItemTitleTypo,
  Root,
  SubtitleTypo,
} from './styled'

type PloggingMeetingReviewPageProps = {
  className?: string
}

export const PloggingMeetingReviewPage: FC<PloggingMeetingReviewPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [ratingList, setRatingList] = useState<[number, number, number]>([0, 0, 0])

  const onChangeRating = (id: number, value: number) => () => {
    setRatingList((prevRatingList) => {
      return prevRatingList.map((prevRatingItem, index) => (id === index ? value : prevRatingItem)) as [
        number,
        number,
        number
      ]
    })
  }

  const onClickFinishButton = () => {
    navigate('/')
  }

  return (
    <Root className={className}>
      <Header title={'함께하기 결과'} />
      <SubtitleTypo>
        우리의 모임으로 <br />
        내일의 거리가 더욱 깨끗해졌어요!
      </SubtitleTypo>
      <ContentContainer>
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
            <ImageUploadButtonTypo> 이미지 공유</ImageUploadButtonTypo>
          </ImageUploadButton>
        </ButtonContainer>
        <ContentDivider />
        <QuestionContainer>
          <QuestionItemContainer>
            <QuestionItemTitleTypo>이 플로깅 코스를 추천하나요?</QuestionItemTitleTypo>
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
            <QuestionItemTitleTypo>이 플로깅 코스는 쓰레기가 많았나요?</QuestionItemTitleTypo>
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
          <QuestionItemContainer>
            <QuestionItemTitleTypo>오늘의 리더를 다음에도 만나고 싶으신가요?</QuestionItemTitleTypo>
            <QuestionItemButtonContainer>
              <QuestionItemButton type={'default'} isFilled={ratingList[2] === 1} onClick={onChangeRating(2, 1)}>
                <IconThumbUp size={16} />
                <QuestionItemButtonTypo isFilled={ratingList[2] === 1}> 좋아요</QuestionItemButtonTypo>
              </QuestionItemButton>
              <QuestionItemButton type={'default'} isFilled={ratingList[2] === 2} onClick={onChangeRating(2, 2)}>
                <IconThumbDown size={16} />
                <QuestionItemButtonTypo isFilled={ratingList[2] === 2}>싫어요</QuestionItemButtonTypo>
              </QuestionItemButton>
            </QuestionItemButtonContainer>
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
