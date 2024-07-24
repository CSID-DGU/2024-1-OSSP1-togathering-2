import { MeetingCategoryType } from 'types/meeting'
import { getCoordinatesDistance } from './getCoordinatesDistance'

type CoordinateItemType = {
  lat: number
  lng: number
}

export const getTotalDistance = (coordinates: CoordinateItemType[]) => {
  let totalDistance = 0

  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += getCoordinatesDistance(coordinates[i], coordinates[i + 1])
  }

  return Math.floor(totalDistance)
}

export const getTotalDuration = (type: MeetingCategoryType, distance: number) => {
  let speed = 0 // m/s 단위로 속도 정의

  switch (type) {
    case 'PLOGGING':
    case 'WALKING':
      speed = 5 // 걷는 속도 (예시: 1.4 m/s)
      break
    case 'RUNNING':
      speed = 10 // 뛰는 속도 (예시: 3 m/s)
      break
    case 'RIDING':
      speed = 20 // 자전거 타는 속도 (예시: 5.5 m/s)
      break
    default:
      throw new Error('Invalid meeting category type')
  }

  const duration = distance / speed // 총 시간 (초)
  return { minute: Math.floor(duration / 60), second: Math.floor(duration % 60) }
}

export const getCourseItemInfo = (type: MeetingCategoryType, coordinates: CoordinateItemType[]) => {
  const totalDistance = getTotalDistance(coordinates)
  const totalDuration = getTotalDuration(type, totalDistance)

  return { totalDistance, totalDuration }
}
