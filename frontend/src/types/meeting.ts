import { CourseItemType } from './plogging'

export type MeetingCategoryType = 'PLOGGING' | 'BICYCLE' | 'WALK' | 'RUNNING'

export type MeetingItemType = {
  id: number
  name: string
  maxCount: number
  courseItem: CourseItemType
  category: MeetingCategoryType
  createdAt: string
}

export type MeetingListType = MeetingItemType[]
