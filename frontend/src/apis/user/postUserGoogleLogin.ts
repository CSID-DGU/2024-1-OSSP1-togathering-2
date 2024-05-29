import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  client_id: string
  redirect_url: string
  response_type: string
  scope: string
}

type Type = {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
}

export const postUserGoogleLogin = async (value: Props) => {
  return commonAxios.post('/user/googlelogin', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
