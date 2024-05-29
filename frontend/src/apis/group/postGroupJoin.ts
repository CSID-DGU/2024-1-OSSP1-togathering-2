import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  group_id: number
}

type Type = {}

export const postGroupJoin = async (value: Props) => {
  return commonAxios
    .post(`/group/${value.group_id}/join`, value, {})
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
