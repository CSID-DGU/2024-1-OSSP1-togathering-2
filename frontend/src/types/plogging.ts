export type CoordinateItemType = {
  lat: number
  lng: number
}

export type CourseCoordinateItemType = {
  isFlag: boolean
  isPassed: boolean
  name?: string
} & CoordinateItemType

export type CourseCoordinateListType = CourseCoordinateItemType[]

export type CourseItemType = {
  coordinateList: CourseCoordinateListType
  name?: string
}

export type CourseListType = CourseItemType[]

export type LocalStorageCourseListType = {
  courseList: CourseListType
}
