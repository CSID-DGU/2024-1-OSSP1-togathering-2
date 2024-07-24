import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'
import { USER_ACCESS_TOKEN_KEY } from 'constants/user'
import { loadLocalStorage } from 'utils/handleLocalStorage'

type Props = {}

type Type = {
  course_id: number
  title: string
  metadata: string
}[]

export const getCourseList = async (value: Props) => {
  const accessToken = loadLocalStorage(USER_ACCESS_TOKEN_KEY)

  return commonAxios
    .get('/course/courses/', {
      params: value,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
