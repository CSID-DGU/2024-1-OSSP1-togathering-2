import { PLOGGING_COURSE_LIST_SAMPLE } from 'pages/Plogging/Course/Create/constant'
import { MeetingListType } from 'types/meeting'

export const PLOGGING_MEETING_LIST_SAMPLE: MeetingListType = [
  {
    id: 7,
    name: '테스트 용도에요!',
    maxCount: 2,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[2],
  },
  {
    id: 6,
    name: '테스트 용도에요!',
    maxCount: 10,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[3],
  },
  {
    id: 5,
    name: '테스트 용도에요!',
    maxCount: 6,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[1],
  },
  {
    id: 4,
    name: '테스트 할거에요 그런 용도에요!',
    maxCount: 2,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[2],
  },
  {
    id: 3,
    name: '테스트 용도에요2231!',
    maxCount: 5,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[3],
  },
  {
    id: 2,
    name: '교수님 사랑해요!',
    maxCount: 3,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[0],
  },
  {
    id: 1,
    name: '교수님 좋아해요!',
    maxCount: 7,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[5],
  },
  {
    id: 0,
    name: '교사모!',
    maxCount: 2,
    courseItem: PLOGGING_COURSE_LIST_SAMPLE.courseList[1],
  },
]
