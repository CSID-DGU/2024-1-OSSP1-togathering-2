import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  id: number
}

type Type = {
  dataOfProgress: string
  id: number
  name: string
  status: string
  type: string
  users: { id: number; nickname: string }[]
}

export const getGroupDetails = async (value: Props) => {
  return commonAxios.get(`/group/${value.id}/detail`).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
