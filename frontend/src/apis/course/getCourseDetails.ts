import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  course_id: number
}

type Type = {
  course_id: number
  course_name: string
  flagList: string
}

export const getCourseDetails = async (value: Props) => {
  return commonAxios.get(`/courses/${value.course_id}`).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
