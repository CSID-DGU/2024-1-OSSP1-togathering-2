import { CourseItemType } from './plogging'

export type MeetingCategoryType = 'PLOGGING' | 'RIDING' | 'WALKING' | 'RUNNING'

export type MeetingItemType = {
  id: number
  name: string
  maxCount: number
  courseItem: CourseItemType
  category: MeetingCategoryType
  createdAt: string
  startAt: string
}

export type MeetingListType = MeetingItemType[]

export type LocalStorageMeetingListType = {
  meetingList: MeetingListType
}

export type SelectedMeetingItemType = {
  id: number
}

export type SelectedMeetingListType = SelectedMeetingItemType[]

export type LocalSelectedMeetingListType = {
  selectedMeetingList: SelectedMeetingListType
}
