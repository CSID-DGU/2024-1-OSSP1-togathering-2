import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  groupId: number
}

type Type = {}

export const postGroupStart = async (value: Props) => {
  return commonAxios
    .post(`/group/${value.groupId}/start`, value, {})
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
