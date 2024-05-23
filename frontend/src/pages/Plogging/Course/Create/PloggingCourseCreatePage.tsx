/* eslint-disable */
import { Header } from 'components/Header'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCoordinateListType, LocalStorageCourseListType } from 'types/plogging'
import { loadLocalStorage, saveLocalStorage } from 'utils/handleLocalStorage'
import { PloggingCourseCreateAddress } from './components/PloggingCourseCreateAddress'
import { PloggingCourseCreateClick } from './components/PloggingCourseCreateClick'
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

const AIQuestionList = [
  {
    title: '누구와 함께 할까요?',
    selectList: ['혼자', '친구', '애인', '부모님'],
  },

  {
    title: '어떤 특징이 있나요?',
    selectList: ['편안한 산책로', '쓰레기통 많은', '역사적 의미가 있는', '자연 경관이 아름다운'],
  },
  {
    title: '어떤 단점이 있나요?',
    selectList: ['사람 많은 곳', '가로등 적은 곳', '가로수 적은 곳', '복잡한 길', '좁은 골목', '언덕이나 계단'],
  },
]

const DEFAULT_SELECT_LIST = [
  [false, false, false, false, false],
  [false, false, false, false],
  [false, false, false, false, false, false],
]

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

  const onClickButtonReset = () => {
    if (confirm('정말로 초기화하시겠습니까?? 기존 작업은 전부 삭제됩니다.')) {
      navigate(0)
    }
  }
  const onClickButtonGoBack = () => {
    if (confirm('정말로 이동하시겠습니까? 기존 작업은 전부 삭제됩니다.')) {
      navigate('/plogging/course/list', { replace: true })
    }
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

      newPloggingCourseList = {
        courseList: [
          {
            id: newPloggingCourseList.courseList.length,
            name: courseName,
            coordinateList: newCoordinateList,
          },
          ...newPloggingCourseList.courseList,
        ],
      }
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(newPloggingCourseList))
      navigate(-1)
      return
    } else {
      let newPloggingCourseList: LocalStorageCourseListType = {
        courseList: [
          {
            id: PLOGGING_COURSE_LIST_SAMPLE.courseList.length,
            name: courseName,
            coordinateList: newCoordinateList,
          },
          ...PLOGGING_COURSE_LIST_SAMPLE.courseList,
        ],
      }
      saveLocalStorage(PLOGGING_COURSE_LIST_KEY, JSON.stringify(newPloggingCourseList))
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
                제작 방식:{' '}
                {ploggingCourseCreateType === 'ADDRESS' ? '추천 경로로 만들기(주소)' : '상세하게 만들기(클릭)'}
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
            <ContentContainer>
              {ploggingCourseCreateType === 'ADDRESS' && <PloggingCourseCreateAddress onSave={onSave} />}
              {ploggingCourseCreateType === 'CLICK' && <PloggingCourseCreateClick onSave={onSave} />}
            </ContentContainer>
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
          <SubmitButtonButton onClick={onSubmit} type={'primary'}>
            <SubmitButtonTypo> 코스 제작 완료하기</SubmitButtonTypo>
          </SubmitButtonButton>
        </>
      )}
      {/* <MenuContainer>
        <SeparateDivider />
        <CourseResetButton type={'primary'} size={'large'} danger onClick={onClickButtonReset}>
          초기화하기
        </CourseResetButton>
        <CourseGoBackButton type={'default'} size={'large'} onClick={onClickButtonGoBack}>
          목록으로
        </CourseGoBackButton>
      </MenuContainer> */}
    </Root>
  )
}
