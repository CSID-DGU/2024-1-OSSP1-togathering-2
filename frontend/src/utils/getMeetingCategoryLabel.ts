import { MeetingCategoryType } from 'types/meeting'

export const getMeetingCategoryLabel = (category: MeetingCategoryType) => {
  if (category === 'RIDING') {
    return '라이딩'
  }
  if (category === 'PLOGGING') {
    return '플로깅'
  }
  if (category === 'RUNNING') {
    return '러닝'
  }
  return '산책'
}
