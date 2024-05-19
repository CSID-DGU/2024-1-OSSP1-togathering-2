import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { Spin } from 'antd'
import { PLOGGING_COURSE_LIST_KEY } from 'constants/common'
import { PloggingCourseViewer } from 'pages/Plogging/Course/Create/components/PloggingCourseViewer'
import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lightTheme } from 'styles/theme'
import { CourseListType } from 'types/plogging'
import { getRandomOrder } from 'utils/getRandomOrder'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import {
  AIContainer,
  AIQuestionContainer,
  AIQuestionItemButton,
  AIQuestionItemButtonContainer,
  AIQuestionItemButtonTypo,
  AIQuestionItemContainer,
  AIQuestionItemTitleTypo,
  AISubmitButton,
  AISubmitButtonTypo,
  AITitleTypo,
  CourseContainer,
  CreateCourseButton,
  CreateCourseButtonTypo,
  QuestionContainer,
  QuestionItemButton,
  QuestionItemButtonContainer,
  QuestionItemButtonTypo,
  QuestionItemContainer,
  QuestionItemTitleTypo,
  Root,
  SortConditionChip,
  SortConditionChipIconSparkles,
  SortConditionChipTypo,
  SortConditionContainer,
} from './styled'

type SelectPloggingCourseProps = {
  className?: string
  onSelectPloggingCourse: (id: number) => void
}

const AIQuestionList = [
  {
    title: '누구와 함께 하시나요?',
    selectList: ['혼자', '친구', '애인', '부모님'],
  },

  {
    title: '선호하는 코스가 있으신가요?',
    selectList: ['편안한 산책로', '쓰레기통 많은', '역사적 의미가 있는', '자연 경관이 아름다운'],
  },
  {
    title: '피하고 싶으신 곳이 있나요?',
    selectList: ['사람 많은 곳', '가로등 적은 곳', '가로수 적은 곳', '복잡한 길', '좁은 골목', '언덕이나 계단'],
  },
]

const sortConditionList = [
  {
    label: 'AI 추천',
    indexList: [5, 3, 2, 1, 4],
  },
  {
    label: '가까운 거리 순',
    indexList: getRandomOrder(100),
  },
  {
    label: '짧은 소요시간 순',
    indexList: [1, 5, 4, 3, 2],
  },
  {
    label: '긴 소요시간 순',
    indexList: [2, 3, 4, 5, 1],
  },
  {
    label: '별점 높은 순',
    indexList: [4, 1, 2, 5, 3],
  },
]

const DEFAULT_SELECT_LIST = [
  [false, false, false, false, false],
  [false, false, false, false],
  [false, false, false, false, false, false],
]

export const SelectPloggingCourse: FC<SelectPloggingCourseProps> = ({ className, onSelectPloggingCourse }) => {
  const navigate = useNavigate()
  const [selectList, setSelectList] = useState<typeof DEFAULT_SELECT_LIST>(DEFAULT_SELECT_LIST)
  const [loading, setLoading] = useState<'NONE' | 'LOADING' | 'DONE'>('NONE')
  const [sortConditionIndex, setSortConditionIndex] = useState(1)
  const [courseList, setCourseList] = useState<CourseListType>([])
  const [isSatisfied, setIsSatisfied] = useState<boolean>()

  const onClickSelectList = (id: number, id2: number) => () => {
    setSelectList((prev) =>
      prev.map((value, index) =>
        index === id ? value.map((value2, index2) => (id2 === index2 ? !value2 : value2)) : value
      )
    )
    return
  }

  const onClickAISubmitButton = () => {
    setLoading('LOADING')
    setTimeout(() => {
      setLoading('DONE')
    }, 3000)
  }

  const onClickSortConditionButton = (id: number) => () => {
    setSortConditionIndex((prev) => {
      if (prev === 0 && id !== 0) {
        setLoading('NONE')
        setSelectList(DEFAULT_SELECT_LIST)
      }
      return id
    })
    return
  }

  const onClickSelectPloggingCourseButton = (id: number) => () => {
    onSelectPloggingCourse(id)
    return
  }

  const onClickCreateCourseButton = () => {
    navigate('/plogging/course/create')
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

  if (courseList.length === 0) {
    return <span />
  }

  const washedCourseList = (() => {
    let newCourseList: CourseListType = []
    sortConditionList[sortConditionIndex].indexList.forEach((value) => {
      if (value <= courseList.length) {
        newCourseList.push(courseList[value - 1])
      }
    })
    return newCourseList
  })()

  return (
    <Root className={className}>
      <CreateCourseButton type={'primary'} onClick={onClickCreateCourseButton}>
        <PlusCircleOutlined />
        <CreateCourseButtonTypo>나만의 코스 만들기</CreateCourseButtonTypo>
      </CreateCourseButton>
      <SortConditionContainer>
        {sortConditionList.map((sortConditionItem, index) => (
          <SortConditionChip
            isSelected={sortConditionIndex === index}
            key={`sort_condition_${index}`}
            onClick={onClickSortConditionButton(index)}
          >
            {index === 0 && <SortConditionChipIconSparkles size={16} isSelected={sortConditionIndex === index} />}
            <SortConditionChipTypo isSelected={sortConditionIndex === index}>
              {sortConditionItem.label}
            </SortConditionChipTypo>
          </SortConditionChip>
        ))}
      </SortConditionContainer>
      {sortConditionIndex !== 0 && (
        <>
          <CourseContainer>
            {washedCourseList.map((courseItem) => (
              <PloggingCourseViewer
                courseItem={courseItem}
                onSelect={onClickSelectPloggingCourseButton(courseItem.id)}
                key={`plogging_course_viewer_${courseItem.id}`}
              />
            ))}
          </CourseContainer>
          <CreateCourseButton type={'primary'} onClick={onClickCreateCourseButton}>
            <PlusCircleOutlined />
            <CreateCourseButtonTypo>나만의 코스 만들기</CreateCourseButtonTypo>
          </CreateCourseButton>
        </>
      )}
      {sortConditionIndex === 0 && loading === 'NONE' && (
        <AIContainer>
          <AITitleTypo>AI 입맛대로 맞추기</AITitleTypo>
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
          <AISubmitButton type={'primary'} onClick={onClickAISubmitButton}>
            <SortConditionChipIconSparkles size={18} isSelected={true} />
            <AISubmitButtonTypo>이대로 추천 받기</AISubmitButtonTypo>
          </AISubmitButton>
        </AIContainer>
      )}
      {sortConditionIndex === 0 && loading === 'LOADING' && (
        <AIContainer>
          <AITitleTypo>AI에게 물어보고 있어요...</AITitleTypo>
          <AISubmitButton type={'primary'} disabled={true}>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 16, marginRight: 5, color: lightTheme.colors.primary['700'] }}
                  spin
                />
              }
            />
            <AISubmitButtonTypo isLoading={true}>이대로 추천 받기</AISubmitButtonTypo>
          </AISubmitButton>
        </AIContainer>
      )}
      {sortConditionIndex === 0 && loading === 'DONE' && (
        <>
          <CourseContainer>
            {washedCourseList.map((courseItem) => (
              <PloggingCourseViewer
                courseItem={courseItem}
                onSelect={onClickSelectPloggingCourseButton(courseItem.id)}
                key={`plogging_course_viewer_${courseItem.id}`}
              />
            ))}
          </CourseContainer>
          <QuestionContainer>
            <QuestionItemContainer>
              <QuestionItemTitleTypo>검색 결과에 만족하시나요?</QuestionItemTitleTypo>
              <QuestionItemButtonContainer>
                <QuestionItemButton
                  type={'default'}
                  isFilled={isSatisfied === true}
                  onClick={() => setIsSatisfied(true)}
                >
                  <IconThumbUp size={16} />
                  <QuestionItemButtonTypo isFilled={isSatisfied === true}> 좋아요</QuestionItemButtonTypo>
                </QuestionItemButton>
                <QuestionItemButton
                  type={'default'}
                  isFilled={isSatisfied === false}
                  onClick={() => setIsSatisfied(false)}
                >
                  <IconThumbDown size={16} />
                  <QuestionItemButtonTypo isFilled={isSatisfied === false}>별로에요</QuestionItemButtonTypo>
                </QuestionItemButton>
              </QuestionItemButtonContainer>
            </QuestionItemContainer>
          </QuestionContainer>
        </>
      )}
    </Root>
  )
}
