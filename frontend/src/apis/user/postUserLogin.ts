import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  username: string
  password: string
}

type Type = {
  access: string
}

export const postUserLogin = async (value: Props) => {
  return commonAxios.post('/user/login/', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
