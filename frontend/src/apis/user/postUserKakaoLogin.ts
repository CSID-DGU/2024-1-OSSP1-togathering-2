import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  client_id: string
  redirect_url: string
  response_type: string
  scope: string
  prompt: string
}

type Type = {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
}

export const postUserKakaoLogin = async (value: Props) => {
  return commonAxios.post('/user/kakaologin', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
