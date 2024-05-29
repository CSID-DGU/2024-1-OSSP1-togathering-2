import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

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
  return commonAxios.get('/group/list', value).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
