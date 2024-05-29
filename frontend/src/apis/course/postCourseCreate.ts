import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  course_name: String
  FlagList: { lat: number; lng: number }[]
}

type Type = {
  course_id: number
}

export const postCourseCreate = async (value: Props) => {
  return commonAxios.post('/courses', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
