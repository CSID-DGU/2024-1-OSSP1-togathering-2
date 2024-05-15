import { PlusCircleOutlined } from '@ant-design/icons'
import { PLOGGING_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MeetingListType } from 'types/meeting'
import { getRandomOrder } from 'utils/getRandomOrder'
import { PloggingMeetingViewer } from '../PloggingMeetingViewer'
import {
  CourseContainer,
  CreateCourseButton,
  CreateCourseButtonTypo,
  Root,
  SortConditionChip,
  SortConditionChipTypo,
  SortConditionContainer,
} from './styled'

type SelectPloggingMeetingProps = {
  className?: string
  onSelectPloggingMeeting: (id: number) => () => void
}

const sortConditionList = [
  {
    label: '가까운 거리 순',
    indexList: getRandomOrder(100),
  },
  {
    label: '짧은 소요시간 순',
    indexList: [1, 5, 4, 3, 2, 6, 7],
  },
  {
    label: '긴 소요시간 순',
    indexList: [2, 3, 4, 5, 1, 6, 7],
  },
  {
    label: '별점 높은 순',
    indexList: [4, 1, 2, 5, 3, 6, 7],
  },
]

export const SelectPloggingMeeting: FC<SelectPloggingMeetingProps> = ({ className, onSelectPloggingMeeting }) => {
  const navigate = useNavigate()
  const [sortConditionIndex, setSortConditionIndex] = useState(1)
  const [meetingList] = useState<MeetingListType>(PLOGGING_MEETING_LIST_SAMPLE)

  const onClickSortConditionButton = (id: number) => () => {
    setSortConditionIndex((prev) => {
      return id
    })
    return
  }

  const onClickCreateMeetingButton = () => {
    navigate('/plogging/meeting/create/course')
  }

  if (meetingList.length === 0) {
    return <span />
  }

  const washedMeetingList = (() => {
    let newMeetingList: MeetingListType = []
    sortConditionList[sortConditionIndex].indexList.forEach((value) => {
      if (value <= meetingList.length) {
        newMeetingList.push(meetingList[value - 1])
      }
    })
    return newMeetingList
  })()

  return (
    <Root className={className}>
      <SortConditionContainer>
        {sortConditionList.map((sortConditionItem, index) => (
          <SortConditionChip
            isSelected={sortConditionIndex === index}
            key={`sort_condition_${index}`}
            onClick={onClickSortConditionButton(index)}
          >
            <SortConditionChipTypo isSelected={sortConditionIndex === index}>
              {sortConditionItem.label}
            </SortConditionChipTypo>
          </SortConditionChip>
        ))}
      </SortConditionContainer>
      <CourseContainer>
        {washedMeetingList.map((meetingItem) => (
          <PloggingMeetingViewer
            meetingItem={meetingItem}
            onSelect={onSelectPloggingMeeting(meetingItem.id)}
            key={`plogging_meeting_viewer_${meetingItem.id}`}
          />
        ))}
      </CourseContainer>
      <CreateCourseButton type={'primary'} onClick={onClickCreateMeetingButton}>
        <PlusCircleOutlined />
        <CreateCourseButtonTypo>나만의 플로깅 모임 만들기</CreateCourseButtonTypo>
      </CreateCourseButton>
    </Root>
  )
}
