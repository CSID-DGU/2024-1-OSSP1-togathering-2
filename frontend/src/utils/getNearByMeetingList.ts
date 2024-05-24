import { MeetingListType } from 'types/meeting'
import { getCoordinatesDistance } from './getCoordinatesDistance'

export const getNearbyMeetingList = (meetingList: MeetingListType, now: { lng: number; lat: number }) => {
  let newMeetingList: MeetingListType = []

  meetingList.forEach((meetingItem) => {
    if (getCoordinatesDistance(now, meetingItem.courseItem.coordinateList[0]) < 800) {
      newMeetingList.push(meetingItem)
    }
  })

  return newMeetingList
}
