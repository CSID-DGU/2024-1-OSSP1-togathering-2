import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  username: string
  password: string
}

type Type = {
  accessToken: string
  refreshToken: string
}

export const postUserLogin = async (value: Props) => {
  return commonAxios.post('/login', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
