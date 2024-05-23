import { MeetingListType } from 'types/meeting'
import { getCoordinatesDistance } from './getCoordinatesDistance'

export const getNearByMeetingList = (meetingList: MeetingListType, now: { lng: number; lat: number }) => {
  let newMeetingList: MeetingListType = []

  meetingList.forEach((meetingItem) => {
    console.log(meetingItem.name, getCoordinatesDistance(now, meetingItem.courseItem.coordinateList[0]))
    if (getCoordinatesDistance(now, meetingItem.courseItem.coordinateList[0]) < 400) {
      newMeetingList.push(meetingItem)
    }
  })

  return newMeetingList
}
