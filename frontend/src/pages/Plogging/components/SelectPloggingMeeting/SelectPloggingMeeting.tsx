import { PlusCircleOutlined } from '@ant-design/icons'
import { IconSearch } from '@tabler/icons-react'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lightTheme } from 'styles/theme'
import { MeetingCategoryType, MeetingListType } from 'types/meeting'
import { getRandomOrder } from 'utils/getRandomOrder'
import { PloggingMeetingViewer } from '../PloggingMeetingViewer'
import {
  CourseContainer,
  CreateCourseButton,
  CreateCourseButtonTypo,
  ResultNotFoundTypo,
  Root,
  SearchButton,
  SearchButtonTypo,
  SearchInput,
  SortConditionChip,
  SortConditionChipTypo,
  SortConditionContainer,
} from './styled'

type SelectPloggingMeetingProps = {
  className?: string
  onSelectPloggingMeeting: (id: number, category: MeetingCategoryType) => () => void
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
  const { state: isSearchAvailable, setTrue: openSearch, setFalse: closeSearch } = useBooleanState(false)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const {
    state: isSearchResultAvailable,
    setTrue: showSearchResult,
    setFalse: closeSearchResult,
  } = useBooleanState(false)
  const [sortConditionIndex, setSortConditionIndex] = useState(0)
  const [meetingList] = useState<MeetingListType>(ALL_MEETING_LIST_SAMPLE)

  const onClickSortConditionButton = (id: number) => () => {
    setSortConditionIndex((prev) => {
      return id
    })
    closeSearch()
    closeSearchResult()
    setSearchKeyword('')
    return
  }

  const onClickSearchChip = () => {
    openSearch()
  }

  const onChangeSearch = (e: any) => {
    setSearchKeyword(e.target.value)
    closeSearchResult()
  }

  const onKeyPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickSearchButton()
    }
  }

  const onClickSearchButton = () => {
    if (searchKeyword.length < 2) {
      alert('두 글자 이상 입력해주세요!')
      return
    }
    showSearchResult()
  }

  const onClickCreateMeetingButton = () => {
    navigate('/plogging/meeting/create/course')
  }

  if (meetingList.length === 0) {
    return (
      <Root className={className}>
        <CreateCourseButton type={'primary'} onClick={onClickCreateMeetingButton}>
          <PlusCircleOutlined />
          <CreateCourseButtonTypo>나만의 모임 만들기</CreateCourseButtonTypo>
        </CreateCourseButton>
      </Root>
    )
  }

  const washedMeetingList = (() => {
    let newMeetingList: MeetingListType = []
    if (!isSearchResultAvailable) {
      sortConditionList[sortConditionIndex].indexList.forEach((value) => {
        if (value <= meetingList.length) {
          newMeetingList.push(meetingList[value - 1])
        }
      })
      return newMeetingList
    }
    newMeetingList = meetingList.filter((meetingItem) => meetingItem.name.indexOf(searchKeyword) !== -1)
    return newMeetingList
  })()

  return (
    <Root className={className}>
      <CreateCourseButton type={'primary'} onClick={onClickCreateMeetingButton}>
        <PlusCircleOutlined />
        <CreateCourseButtonTypo>나만의 모임 만들기</CreateCourseButtonTypo>
      </CreateCourseButton>
      <SortConditionContainer>
        <SortConditionChip isSelected={isSearchAvailable} onClick={onClickSearchChip}>
          <IconSearch size={12} color={!isSearchAvailable ? lightTheme.colors.base['700'] : 'white'} />
          <SortConditionChipTypo isSelected={isSearchAvailable}>검색</SortConditionChipTypo>
        </SortConditionChip>
        {sortConditionList.map((sortConditionItem, index) => (
          <SortConditionChip
            isSelected={sortConditionIndex === index && !isSearchAvailable}
            key={`sort_condition_${index}`}
            onClick={onClickSortConditionButton(index)}
          >
            <SortConditionChipTypo isSelected={sortConditionIndex === index && !isSearchAvailable}>
              {sortConditionItem.label}
            </SortConditionChipTypo>
          </SortConditionChip>
        ))}
      </SortConditionContainer>
      <CourseContainer>
        {!isSearchAvailable &&
          washedMeetingList.map((meetingItem) => (
            <PloggingMeetingViewer
              meetingItem={meetingItem}
              onSelect={onSelectPloggingMeeting(meetingItem.id, meetingItem.category)}
              key={`plogging_meeting_viewer_${meetingItem.id}`}
            />
          ))}
        {isSearchAvailable && (
          <>
            <SearchInput
              placeholder="검색어를 입력해주세요."
              value={searchKeyword}
              onChange={onChangeSearch}
              onKeyDown={onKeyPressEnter}
            />
            <SearchButton type={'primary'} onClick={onClickSearchButton}>
              <IconSearch size={16} />
              <SearchButtonTypo>이 키워드로 검색하기</SearchButtonTypo>
            </SearchButton>
            {isSearchResultAvailable &&
              (washedMeetingList.length > 0 ? (
                washedMeetingList.map((meetingItem) => (
                  <PloggingMeetingViewer
                    meetingItem={meetingItem}
                    onSelect={onSelectPloggingMeeting(meetingItem.id, meetingItem.category)}
                    key={`plogging_meeting_viewer_${meetingItem.id}`}
                  />
                ))
              ) : (
                <ResultNotFoundTypo>검색 결과가 존재하지 않습니다...</ResultNotFoundTypo>
              ))}
          </>
        )}
      </CourseContainer>
      {!isSearchAvailable && (
        <CreateCourseButton type={'primary'} onClick={onClickCreateMeetingButton}>
          <PlusCircleOutlined />
          <CreateCourseButtonTypo>나만의 모임 만들기</CreateCourseButtonTypo>
        </CreateCourseButton>
      )}
    </Root>
  )
}
