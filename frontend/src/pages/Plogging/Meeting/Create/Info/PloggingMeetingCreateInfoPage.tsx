import { getCourseList } from 'apis/course/getCourseList'
import { postGroupCreate } from 'apis/group/postGroupCreate'
import { Header } from 'components/Header'
import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MeetingCategoryType } from 'types/meeting'
import { CourseListType } from 'types/plogging'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
import { Step2Section } from './components/Step2Section'
import { Step3Section } from './components/Step3Section'
import {
  CategorySelect,
  CategorySelectContainer,
  ContentContainer,
  ContentDatePicker,
  Root,
  SubmitButton,
  SubmitButtonTypo,
  SubtitleCircle,
  SubtitleCircleTypo,
  SubtitleContainer,
  SubtitleTypo,
} from './styled'

type PloggingMeetingCreateInfoPageProps = {
  className?: string
}

export const CREATE_TYPE_SELECT_OPTIONS: { label: string; value: MeetingCategoryType }[] = [
  { label: '산책', value: 'WALKING' },
  { label: '러닝', value: 'RUNNING' },
  { label: '라이딩', value: 'RIDING' },
  { label: '플로깅', value: 'PLOGGING' },
]

export const PloggingMeetingCreateInfoPage: FC<PloggingMeetingCreateInfoPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingCourseId } = state
  const [selectedCategory, setSelectedCategory] = useState<MeetingCategoryType>()
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState<CourseListType>([])

  const [step, setStep] = useState<'2' | '3' | '4' | '5'>('2')
  const [step2Count, setStep2Count] = useState<number>(2)
  const [step3Name, setStep3Name] = useState<string>('')
  const [startAt, setStartAt] = useState<string>()

  const handleStep2Count = (type: 'PLUS' | 'MINUS' | 'SET', value?: number) => () => {
    if (type === 'SET' && value) {
      setStep2Count((prev) => {
        if (value >= 98) {
          return 99
        }
        if (value <= 2) {
          return 2
        }
        return prev + 1
      })
      return
    }
    if (type === 'PLUS') {
      setStep2Count((prev) => {
        if (prev >= 98) {
          return 99
        }
        return prev + 1
      })
      return
    }
    if (type === 'MINUS') {
      setStep2Count((prev) => {
        if (prev <= 2) {
          return 2
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
    if (!selectedPloggingCourseItem) {
      alert('코스 인식에 실패했습니다.')
      return
    }
    if (!selectedCategory) {
      alert('카테고리가 입력되지 않았습니다.')
      return
    }
    if (!startAt) {
      alert('시작 일시를 입력해주세요.')
      return
    }
    if (step3Name.length < 2) {
      alert('모임 이름은 2글자 이상 입력해주세요.')
      return
    }
    let now = new Date()
    let nowDayjs = dayjs(now)

    postGroupCreate({
      groupName: step3Name,
      type: selectedCategory,
      dateOfProgress: nowDayjs.format('YYYY-MM-DDTHH:mm'),
      courseId: selectedPloggingCourseItem.id,
    }).then((res) => {
      console.log({ res })
    })

    // navigate('/meeting/scheduled')
    return
  }

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

  const onChangeSelectCreateType = (value: any) => {
    setSelectedCategory(value)
    setStep('3')
    return
  }

  const onChangeStartAt = (_: any, dateString: any) => {
    let now = new Date()
    let newDate = dayjs(dateString)
    if (newDate.isBefore(now)) {
      alert('모임 시작 일정이 오늘이거나 과거입니다.')
      return
    }

    setStartAt(newDate.format('YYYY-MM-DDTHH:mm'))
  }

  const onSubmitTime = () => {
    setStep('5')
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

      {(step === '3' || step === '4' || step === '5') && (
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
      {(step === '4' || step === '5') && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>4</SubtitleCircleTypo>
            </SubtitleCircle>
            {step === '4' && <SubtitleTypo>모임은 언제 시작할까요?</SubtitleTypo>}
            {step !== '4' && <SubtitleTypo>{`일시: ${dayjs(startAt).format('YYYY.MM.DD A hh:mm')}`}</SubtitleTypo>}
          </SubtitleContainer>
          {step === '4' && (
            <ContentContainer>
              <ContentDatePicker
                placeholder="날짜와 시간을 정해주세요."
                showTime
                format={{
                  format: 'YYYY-MM-DDThh:mm:ss',
                  type: 'mask',
                }}
                onChange={onChangeStartAt}
              />
              <SubmitButton type={'primary'} onClick={onSubmitTime}>
                <SubmitButtonTypo>완료하기</SubmitButtonTypo>
              </SubmitButton>
            </ContentContainer>
          )}
        </>
      )}
      {step === '5' && (
        <>
          <SubtitleContainer>
            <SubtitleCircle>
              <SubtitleCircleTypo>5</SubtitleCircleTypo>
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
