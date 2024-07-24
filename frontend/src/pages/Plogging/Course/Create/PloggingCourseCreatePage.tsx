/* eslint-disable */
import { postCourseCreate } from 'apis/course/postCourseCreate'
import { Header } from 'components/Header'
import { MY_COURSE_LIST_KEY, PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { AIQuestionList, DEFAULT_SELECT_LIST } from 'constants/course'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCoordinateListType, LocalStorageCourseListType } from 'types/plogging'
import { loadLocalStorage, saveLocalStorage } from 'utils/handleLocalStorage'
import { PloggingCourseCreateAddress } from './components/PloggingCourseCreateAddress'
import { PloggingCourseCreateClick } from './components/PloggingCourseCreateClick'
import { PloggingCourseCreateManual } from './components/PloggingCourseCreateManual'
import { CREATE_TYPE_SELECT_OPTIONS, PLOGGING_COURSE_LIST_SAMPLE } from './constant'
import {
  AIContainer,
  AIQuestionContainer,
  AIQuestionItemButton,
  AIQuestionItemButtonContainer,
  AIQuestionItemButtonTypo,
  AIQuestionItemContainer,
  AIQuestionItemTitleTypo,
  AITitleTypo,
  ContentContainer,
  CourseNameInput,
  CreateTypeContainer,
  CreateTypeSelect,
  Root,
  StepBackButton,
  StepBackButtonContainer,
  StepBackButtonTypo,
  StepContainer,
  SubmitButtonButton,
  SubmitButtonTypo,
  SubtitleCircle,
  SubtitleCircleTypo,
  SubtitleContainer,
  SubtitleTypo,
} from './styled'
import { PloggingCourseCreateType } from './type'

type CourseCreateProps = {
  className?: string
}

export const PloggingCourseCreatePage: FC<CourseCreateProps> = ({ className }) => {
  const [ploggingCourseCreateType, setPloggingCourseCreateType] = useState<PloggingCourseCreateType>()
  const [step, setStep] = useState<'1' | '2' | '3' | '4'>('1')
  const [courseName, setCourseName] = useState<string>('')
  const [newCoordinateList, setNewCoordinateList] = useState<any[]>([])
  const [selectList, setSelectList] = useState<typeof DEFAULT_SELECT_LIST>(DEFAULT_SELECT_LIST)

  const navigate = useNavigate()

  const onChangeSelectCreateType = (value: any) => {
    setPloggingCourseCreateType(value)
    onClickSubmitStep2Button()
    return
  }

  const onSave = (coordinateList: CourseCoordinateListType) => {
    setNewCoordinateList(coordinateList)
    setStep('4')
  }

  const onSubmit = () => {
    if (!courseName) {
      alert('코스 이름을 입력해주세요.')
      return
    }
    let currentPloggingCourseList = loadLocalStorage(PLOGGING_COURSE_LIST_KEY)
    if (currentPloggingCourseList) {
      let newPloggingCourseList: LocalStorageCourseListType = JSON.parse(currentPloggingCourseList)
      let newId = newPloggingCourseList.courseList.length

      newPloggingCourseList = {
        courseList: [
          {
            id: newId,
            name: courseName,
            coordinateList: newCoordinateList,
          },
          ...newPloggingCourseList.courseList,
        ],
      }
      postCourseCreate({
        title: courseName,
        duration: 0,
        tag: '태그',
        time: 0,
        metadata: JSON.stringify(newCoordinateList),
      })
        .then((res) => {
          if (res) {
            alert('코스 생성이 완료되었습니다.')
            navigate(-1)
          }
        })
        .catch((res) => {
          if (res) {
            alert(res.response.data.message)
          }
        })
      return
    } else {
      let newId = PLOGGING_COURSE_LIST_SAMPLE.courseList.length
      let newPloggingCourseList: LocalStorageCourseListType = {
        courseList: [
          {
            id: newId,
            name: courseName,
            coordinateList: newCoordinateList,
          },
          ...PLOGGING_COURSE_LIST_SAMPLE.courseList,
        ],
      }
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(newPloggingCourseList))

      let myCourseIdList = loadLocalStorage(MY_COURSE_LIST_KEY)
      if (typeof myCourseIdList !== 'string') {
        let newMyCourseIdList = [newId]
        saveLocalStorage(MY_COURSE_LIST_KEY, JSON.stringify(newMyCourseIdList))
      } else {
        let newMyCourseIdList = JSON.parse(myCourseIdList) as number[]
        newMyCourseIdList = [newId, ...newMyCourseIdList]
        saveLocalStorage(MY_COURSE_LIST_KEY, JSON.stringify(newMyCourseIdList))
      }
      navigate(-1)
      return
    }
  }

  const onClickSubmitStep1Button = () => {
    if (courseName.length < 2) {
      alert('코스 이름은 2글자 이상 입력해주세요.')
      return
    }
    setStep('2')
    return
  }

  const onClickSubmitStep2Button = () => {
    setStep('3')
    return
  }

  const onClickStepBack = () => {
    if (step === '2') {
      setStep('1')
      return
    }
    if (step === '3') {
      setStep('2')
      return
    }
    if (step === '4') {
      setStep('3')
      return
    }
  }

  const onClickSelectList = (id: number, id2: number) => () => {
    setSelectList((prev) =>
      prev.map((value, index) =>
        index === id ? value.map((value2, index2) => (id2 === index2 ? !value2 : value2)) : value
      )
    )
    return
  }

  return (
    <Root className={className}>
      <Header title={'나만의 코스 만들기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        {step === '1' ? (
          <SubtitleTypo> 코스 이름을 입력해주세요.</SubtitleTypo>
        ) : (
          <SubtitleTypo> 코스 이름: {courseName}</SubtitleTypo>
        )}
      </SubtitleContainer>
      {step === '1' && (
        <StepContainer>
          <CourseNameInput
            size={'large'}
            value={courseName}
            onChange={(e: any) => setCourseName(e.target.value)}
            placeholder={' 코스 이름을 입력해주세요.'}
          />
          <SubmitButtonButton onClick={onClickSubmitStep1Button} type={'primary'}>
            <SubmitButtonTypo>이름 입력 완료</SubmitButtonTypo>
          </SubmitButtonButton>
        </StepContainer>
      )}
      {(step === '2' || step === '3' || step === '4') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>2</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '2' ? (
              <SubtitleTypo>코스 제작 방식을 선택해주세요.</SubtitleTypo>
            ) : (
              <SubtitleTypo>
                제작 방식: {ploggingCourseCreateType === 'ADDRESS' && '추천 경로로 만들기(주소)'}
                {ploggingCourseCreateType === 'CLICK' && '상세하게 만들기(클릭)'}
                {ploggingCourseCreateType === 'MANUAL' && '수동으로 만들기(클릭)'}
              </SubtitleTypo>
            )}
          </SubtitleContainer>
          {step === '2' && (
            <CreateTypeContainer>
              <CreateTypeSelect
                size={'large'}
                placeholder="코스 제작 방식을 선택해주세요."
                optionFilterProp="children"
                onChange={onChangeSelectCreateType}
                options={CREATE_TYPE_SELECT_OPTIONS}
              />
              <StepBackButton onClick={onClickStepBack}>
                <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
              </StepBackButton>
            </CreateTypeContainer>
          )}
        </>
      )}
      {(step === '3' || step === '4') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>3</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '3' ? <SubtitleTypo>경로 입력하기</SubtitleTypo> : <SubtitleTypo>경로 입력 완료</SubtitleTypo>}
          </SubtitleContainer>
          {step === '3' && (
            <StepBackButtonContainer>
              <ContentContainer>
                {ploggingCourseCreateType === 'ADDRESS' && <PloggingCourseCreateAddress onSave={onSave} />}
                {ploggingCourseCreateType === 'CLICK' && <PloggingCourseCreateClick onSave={onSave} />}
                {ploggingCourseCreateType === 'MANUAL' && <PloggingCourseCreateManual onSave={onSave} />}
              </ContentContainer>
              <StepBackButton onClick={onClickStepBack}>
                <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
              </StepBackButton>
            </StepBackButtonContainer>
          )}
        </>
      )}
      {step === '4' && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>4</SubtitleCircleTypo>
            </SubtitleCircle>
            <SubtitleTypo>필터 정보 입력하기(선택)</SubtitleTypo>
          </SubtitleContainer>
          <AIContainer>
            <AITitleTypo> 코스 필터 조건 넣기</AITitleTypo>
            <AIQuestionContainer>
              {AIQuestionList.map((AIQuestionItem, index) => (
                <AIQuestionItemContainer key={`ai_question_item_${index}`}>
                  <AIQuestionItemTitleTypo>{AIQuestionItem.title}</AIQuestionItemTitleTypo>
                  <AIQuestionItemButtonContainer>
                    {AIQuestionItem.selectList.map((selectItem, index2) => (
                      <AIQuestionItemButton
                        type={'primary'}
                        isSelected={selectList[index][index2]}
                        onClick={onClickSelectList(index, index2)}
                        key={`ai_question_item_${index}_${index2}`}
                      >
                        <AIQuestionItemButtonTypo isSelected={selectList[index][index2]}>
                          {selectItem}
                        </AIQuestionItemButtonTypo>
                      </AIQuestionItemButton>
                    ))}
                  </AIQuestionItemButtonContainer>
                </AIQuestionItemContainer>
              ))}
            </AIQuestionContainer>
          </AIContainer>
          <StepBackButtonContainer>
            <SubmitButtonButton onClick={onSubmit} type={'primary'}>
              <SubmitButtonTypo> 코스 제작 완료하기</SubmitButtonTypo>
            </SubmitButtonButton>
            <StepBackButton onClick={onClickStepBack}>
              <StepBackButtonTypo>이전 단계</StepBackButtonTypo>
            </StepBackButton>
          </StepBackButtonContainer>
        </>
      )}
    </Root>
  )
}
