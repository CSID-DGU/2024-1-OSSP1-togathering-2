import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'
import { USER_ACCESS_TOKEN_KEY } from 'constants/user'
import { loadLocalStorage } from 'utils/handleLocalStorage'

type Props = {}

type Type = {
  id: number
  name: string
  type: string
  dateOfProgress: string
  status: String
  users: { id: number; nickname: string }[]
}[]

export const getGroupList = async (value: Props) => {
  const accessToken = loadLocalStorage(USER_ACCESS_TOKEN_KEY)
  return commonAxios
    .get('/group/list', {
      params: value,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
