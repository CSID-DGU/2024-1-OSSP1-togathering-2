export type CoordinateItemType = {
  lat: number
  lng: number
}

export type CourseItemType = {
  isFlag: boolean
  isPassed: boolean
} & CoordinateItemType

export type RunningCourseItemType = {
  id: number
  cameraCoordinate: CoordinateItemType
  courseList: CourseItemType[]
  name?: string
  totalDistance?: number
  totalWalkingTime?: number
  tag: string[]
  level: number
}

export type CourseType = {}
