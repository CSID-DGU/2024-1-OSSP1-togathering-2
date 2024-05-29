import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {}

type Type = {
  course_id: number
  course_name: string
  flagList: string
}[]

export const getCourseList = async (value: Props) => {
  return commonAxios.get('/courses', value).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
