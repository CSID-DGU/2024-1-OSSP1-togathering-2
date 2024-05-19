import { Header } from 'components/Header'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MeetingCategoryType } from 'types/meeting'
import { CourseListType } from 'types/plogging'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { Step2Section } from './components/Step2Section'
import { Step3Section } from './components/Step3Section'
import {
  CategorySelect,
  CategorySelectContainer,
  ContentContainer,
  Root,
  SubtitleCircle,
  SubtitleCircleTypo,
  SubtitleContainer,
  SubtitleTypo,
} from './styled'

type PloggingMeetingCreateInfoPageProps = {
  className?: string
}

export const CREATE_TYPE_SELECT_OPTIONS: { label: string; value: MeetingCategoryType }[] = [
  { label: '산책', value: 'WALK' },
  { label: '러닝', value: 'RUNNING' },
  { label: '라이딩', value: 'BICYCLE' },
  { label: '플로깅', value: 'PLOGGING' },
]

export const PloggingMeetingCreateInfoPage: FC<PloggingMeetingCreateInfoPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingCourseId } = state
  const [selectedCategory, setSelectedCategory] = useState<MeetingCategoryType>()
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  const [step, setStep] = useState<'2' | '3' | '4'>('2')
  const [step2Count, setStep2Count] = useState<number>(2)
  const [step3Name, setStep3Name] = useState<string>('')

  const handleStep2Count = (type: 'PLUS' | 'MINUS') => () => {
    if (type === 'PLUS') {
      setStep2Count((prev) => {
        if (prev >= 100) {
          return prev
        }
        return prev + 1
      })
      return
    }
    if (type === 'MINUS') {
      setStep2Count((prev) => {
        if (prev <= 2) {
          return prev
        }
        return prev - 1
      })
      return
    }
  }

  const onSaveStep2 = () => {
    setStep('4')
    return
  }

  const onChangeStep3 = (value: string) => {
    setStep3Name(value)
    return
  }

  const onSaveStep3 = () => {
    navigate(-2)
    return
  }

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

  const onChangeSelectCreateType = (value: any) => {
    setSelectedCategory(value)
    setStep('3')
    return
  }

  const selectedPloggingCourseItem =
    courseList.filter((courseItem) => courseItem.id === ploggingCourseId).length > 0
      ? courseList.filter((courseItem) => courseItem.id === ploggingCourseId)[0]
      : null

  return (
    <Root className={className}>
      <Header title={'함께하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        <SubtitleTypo>{`코스 이름: ${selectedPloggingCourseItem?.name}`}</SubtitleTypo>
      </SubtitleContainer>
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>2</SubtitleCircleTypo>
        </SubtitleCircle>
        {selectedCategory ? (
          <SubtitleTypo>{`활동 카테고리: ${getMeetingCategoryLabel(selectedCategory)}`}</SubtitleTypo>
        ) : (
          <SubtitleTypo>어떤 활동을 할까요?</SubtitleTypo>
        )}
      </SubtitleContainer>
      {step === '2' && (
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

      {(step === '3' || step === '4') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>3</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '3' && <SubtitleTypo>인원을 최대 몇명 모집할까요?</SubtitleTypo>}
            {step !== '3' && <SubtitleTypo>{`최대 인원: ${step2Count}명`}</SubtitleTypo>}
          </SubtitleContainer>
          {step === '3' && (
            <ContentContainer>
              <Step2Section step2Count={step2Count} handleStep2Count={handleStep2Count} onSave={onSaveStep2} />
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
            <SubtitleTypo>모임의 이름을 정해주세요!</SubtitleTypo>
          </SubtitleContainer>
          <ContentContainer>
            <Step3Section name={step3Name} onChange={onChangeStep3} onSave={onSaveStep3} />
          </ContentContainer>
        </>
      )}
    </Root>
  )
}
