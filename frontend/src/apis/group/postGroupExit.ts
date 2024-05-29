import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  groupId: number
}

type Type = {}

export const postGroupExit = async (value: Props) => {
  return commonAxios
    .post(`/group/${value.groupId}/exit`, value, {})
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
