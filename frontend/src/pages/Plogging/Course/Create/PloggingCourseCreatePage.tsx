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

export const PloggingCourseCreatePage: FC<CourseCreateProps> = ({ className }) => {
  const [ploggingCourseCreateType, setPloggingCourseCreateType] = useState<PloggingCourseCreateType>()
  const [step, setStep] = useState<'1' | '2' | '3'>('1')

  const [courseName, setCourseName] = useState<string>('')
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
            coordinateList,
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
            id: 0,
            name: courseName,
            coordinateList,
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
    setStep('2')
    return
  }

  const onClickSubmitStep2Button = () => {
    setStep('3')
    return
  }

  return (
    <Root className={className}>
      <Header title={'나만의 플로깅 코스 만들기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        {step === '1' ? (
          <SubtitleTypo>플로깅 코스 이름을 입력해주세요.</SubtitleTypo>
        ) : (
          <SubtitleTypo>플로깅 코스 이름: {courseName}</SubtitleTypo>
        )}
      </SubtitleContainer>
      {step === '1' && (
        <StepContainer>
          <CourseNameInput
            size={'large'}
            value={courseName}
            onChange={(e: any) => setCourseName(e.target.value)}
            placeholder={'플로깅 코스 이름을 입력해주세요.'}
          />
          <SubmitButtonButton onClick={onClickSubmitStep1Button} type={'primary'}>
            <SubmitButtonTypo>이름 입력 완료</SubmitButtonTypo>
          </SubmitButtonButton>
        </StepContainer>
      )}
      {(step === '2' || step === '3') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>2</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '2' ? (
              <SubtitleTypo>플로깅 코스 제작 방식을 선택해주세요.</SubtitleTypo>
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
      {step === '3' && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>3</SubtitleCircleTypo>
            </SubtitleCircle>
            <SubtitleTypo>경로 입력하기</SubtitleTypo>
          </SubtitleContainer>
          <ContentContainer>
            {ploggingCourseCreateType === 'ADDRESS' && <PloggingCourseCreateAddress onSave={onSave} />}
            {ploggingCourseCreateType === 'CLICK' && <PloggingCourseCreateClick onSave={onSave} />}
          </ContentContainer>
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
