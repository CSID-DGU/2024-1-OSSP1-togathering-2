import { MeetingListType } from 'types/meeting'
import { CourseListType } from 'types/plogging'

type CoordinateItemType = {
  lat: number
  lng: number
}

export const getCoordinatesDistance = (start: CoordinateItemType, destination: CoordinateItemType) => {
  const R = 6371e3 // 지구의 반지름 (미터 단위)
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180

  const lat1 = toRadians(start.lat)
  const lat2 = toRadians(destination.lat)
  const deltaLat = toRadians(destination.lat - start.lat)
  const deltaLng = toRadians(destination.lng - start.lng)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c // 두 좌표 사이의 거리 (미터 단위)

  return distance
}

export const getCoordinatesDistanceFromMe = async (destination: CoordinateItemType) => {
  let isError = false
  let myCoordinate: CoordinateItemType = { lat: 0, lng: 0 }

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({ lng: position.coords.longitude, lat: position.coords.latitude })
          },
          (error) => {
            isError = true
          }
        )
      } else {
        reject(new Error('Geolocation is not supported by this browser.'))
      }
    })
  }

  try {
    myCoordinate = (await getCurrentPosition()) as CoordinateItemType
  } catch (error) {
    console.log(error)
    isError = true
  }

  let distance = getCoordinatesDistance(myCoordinate, destination)
  if (isError) {
    return -1
  }
  return distance
}

export const sortCoursesNearBy = async (courseList: CourseListType) => {
  const distancePromises = courseList.map(async (course) => {
    const distance = await getCoordinatesDistanceFromMe(course.coordinateList[0])
    return { course, distance }
  })

  const coursesWithDistances = await Promise.all(distancePromises)

  coursesWithDistances.sort((a, b) => a.distance - b.distance)

  return coursesWithDistances.map(({ course }) => course)
}

export const sortMeetingsNearBy = async (meetingList: MeetingListType) => {
  const distancePromises = meetingList.map(async (meeting) => {
    const distance = await getCoordinatesDistanceFromMe(meeting.courseItem.coordinateList[0])
    return { meeting, distance }
  })

  const coursesWithDistances = await Promise.all(distancePromises)

  coursesWithDistances.sort((a, b) => a.distance - b.distance)

  return coursesWithDistances.map(({ meeting }) => meeting)
}
