import { PlusCircleOutlined } from '@ant-design/icons'
import { IconSearch } from '@tabler/icons-react'
import { getGroupList } from 'apis/group/getGroupList'
import { MEETING_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lightTheme } from 'styles/theme'
import { MeetingCategoryType, MeetingListType } from 'types/meeting'
import { sortMeetingsNearBy } from 'utils/getCoordinatesDistance'
import { getTotalDistance } from 'utils/getCourseItemInfo'
import { getRandomOrder } from 'utils/getRandomOrder'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import { PloggingMeetingViewer } from '../PloggingMeetingViewer'
import {
  CourseContainer,
  CreateCourseButton,
  CreateCourseButtonTypo,
  ResultNotFoundTypo,
  Root,
  SearchButton,
  SearchButtonTypo,
  SearchCategorySelect,
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
    label: '최신순',
    indexList: getRandomOrder(100),
  },
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
    indexList: getRandomOrder(100),
  },
]

type SearchCategoryType = MeetingCategoryType | 'ALL'

export const SEARCH_CATEGORY_SELECT_OPTIONS: { label: string; value: SearchCategoryType }[] = [
  { label: '전체', value: 'ALL' },
  { label: '산책', value: 'WALKING' },
  { label: '러닝', value: 'RUNNING' },
  { label: '라이딩', value: 'RIDING' },
  { label: '플로깅', value: 'PLOGGING' },
]

export const SelectPloggingMeeting: FC<SelectPloggingMeetingProps> = ({ className, onSelectPloggingMeeting }) => {
  const navigate = useNavigate()
  const { state: isSearchAvailable, setTrue: openSearch, setFalse: closeSearch } = useBooleanState(false)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchCategory, setSearchCategory] = useState<SearchCategoryType>('ALL')
  const {
    state: isSearchResultAvailable,
    setTrue: showSearchResult,
    setFalse: closeSearchResult,
  } = useBooleanState(false)
  const [sortConditionIndex, setSortConditionIndex] = useState(0)
  const [meetingList, setMeetingList] = useState<MeetingListType>([])
  const [sortedMeetingList, setSortedMeetingList] = useState<MeetingListType>([])

  const onClickSortConditionButton = (id: number) => () => {
    setSortConditionIndex(id)
    closeSearch()
    closeSearchResult()
    setSearchKeyword('')
    setSearchCategory('ALL')
    return
  }

  const onClickSearchChip = () => {
    openSearch()
  }

  const onChangeCategory = (value: any) => {
    setSearchCategory(value)
    closeSearchResult()
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
    showSearchResult()
  }

  const onClickCreateMeetingButton = () => {
    navigate('/meeting/create/course')
  }

  useEffect(() => {
    let newMeetingList = loadLocalStorage(MEETING_LIST_KEY)
    if (newMeetingList) {
      if (meetingList.length === 0) {
        setMeetingList(JSON.parse(newMeetingList).meetingList)
      }
    } else {
      setMeetingList(ALL_MEETING_LIST_SAMPLE)
    }
  }, [meetingList, setMeetingList])

  const getWashedMeetingListNearBy = async () => {
    return await sortMeetingsNearBy(meetingList)
  }

  const getWashedMeetingList = (sortConditionIndex: number) => {
    let newMeetingList: MeetingListType = [...meetingList]
    if (isSearchAvailable || !(searchKeyword === '' && searchCategory === 'ALL')) {
      return newMeetingList.filter(
        (courseItem) =>
          courseItem?.name &&
          courseItem.name.indexOf(searchKeyword) !== -1 &&
          (courseItem.category === searchCategory || searchCategory === 'ALL')
      )
    }

    if (sortConditionIndex === 0) {
      newMeetingList.sort((a, b) => b.id - a.id)
      return newMeetingList
    }
    if (sortConditionIndex === 2) {
      newMeetingList.sort(
        (a, b) => getTotalDistance(a.courseItem.coordinateList) - getTotalDistance(b.courseItem.coordinateList)
      )
      return newMeetingList
    }

    if (sortConditionIndex === 3) {
      newMeetingList.sort(
        (a, b) => getTotalDistance(b.courseItem.coordinateList) - getTotalDistance(a.courseItem.coordinateList)
      )
      return newMeetingList
    }

    newMeetingList = []

    sortConditionList[sortConditionIndex].indexList.forEach((value) => {
      if (value <= meetingList.length) {
        newMeetingList.push(meetingList[value - 1])
      }
    })

    return newMeetingList
  }

  useEffect(() => {
    if (meetingList.length > 0) {
      if (sortConditionIndex === 1) {
        getWashedMeetingListNearBy().then((value) => setSortedMeetingList(value))
      } else {
        setSortedMeetingList(getWashedMeetingList(sortConditionIndex))
      }
    }
    getGroupList({})
  }, [meetingList, sortConditionIndex, setSortConditionIndex, searchKeyword, searchCategory])

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
          sortedMeetingList.map((meetingItem) => (
            <PloggingMeetingViewer
              meetingItem={meetingItem}
              onSelect={onSelectPloggingMeeting(meetingItem.id, meetingItem.category)}
              key={`plogging_meeting_viewer_${meetingItem.id}`}
            />
          ))}
        {isSearchAvailable && (
          <>
            <SearchCategorySelect
              size={'middle'}
              placeholder="모임 카테고리를 선택해주세요."
              optionFilterProp="children"
              onChange={onChangeCategory}
              options={SEARCH_CATEGORY_SELECT_OPTIONS}
            />
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
              (sortedMeetingList.length > 0 ? (
                sortedMeetingList.map((meetingItem) => (
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
