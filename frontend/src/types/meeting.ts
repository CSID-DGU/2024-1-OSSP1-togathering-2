import { CourseItemType } from './plogging'

export type MeetingItemType = {
  id: number
  name: string
  maxCount: number
  courseItem: CourseItemType
}

export type MeetingListType = MeetingItemType[]
