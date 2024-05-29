import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  tag: string
}

type Type = {
  course_id: number
}[]

export const getRecommendedCourseList = async (value: Props) => {
  return commonAxios.get('/courses/recommend').then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
