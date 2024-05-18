import { Header } from 'components/Header'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseListType } from 'types/plogging'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { Step2Section } from './components/Step2Section'
import { Step3Section } from './components/Step3Section'
import { ContentContainer, Root, SubtitleCircle, SubtitleCircleTypo, SubtitleContainer, SubtitleTypo } from './styled'

type PloggingMeetingCreateInfoPageProps = {
  className?: string
}

export const PloggingMeetingCreateInfoPage: FC<PloggingMeetingCreateInfoPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingCourseId } = state
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  const [step, setStep] = useState<'2' | '3'>('2')
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
    setStep('3')
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
        {step === '2' && <SubtitleTypo>인원을 최대 몇명 모집할까요?</SubtitleTypo>}
        {step !== '2' && <SubtitleTypo>{`최대 인원: ${step2Count}명`}</SubtitleTypo>}
      </SubtitleContainer>
      {step === '2' && (
        <ContentContainer>
          <Step2Section step2Count={step2Count} handleStep2Count={handleStep2Count} onSave={onSaveStep2} />
        </ContentContainer>
      )}
      {step === '3' && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>3</SubtitleCircleTypo>
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
