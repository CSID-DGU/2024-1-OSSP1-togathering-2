import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  nickname: string
  password: string
  user_address: string
  username: string
}

type Type = {}

export const postUserJoin = async (value: Props) => {
  return commonAxios.post('/user/join', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
