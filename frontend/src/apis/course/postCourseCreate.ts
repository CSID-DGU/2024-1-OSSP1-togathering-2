import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'
import { USER_ACCESS_TOKEN_KEY } from 'constants/user'
import { loadLocalStorage } from 'utils/handleLocalStorage'

type Props = {
  title: string
  duration: number
  metadata: string
  tag: string
  time: number
}

type Type = {
  course_id: number
}

export const postCourseCreate = async (value: Props) => {
  const accessToken = loadLocalStorage(USER_ACCESS_TOKEN_KEY)

  console.log(accessToken)

  return commonAxios
    .post('/course/courses/create/', value, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
