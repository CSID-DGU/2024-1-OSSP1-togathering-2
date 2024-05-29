import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  word: string
}

type Type = {
  course_id: number
}[]

export const getCourseSearch = async (value: Props) => {
  return commonAxios.get('/courses/search').then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
