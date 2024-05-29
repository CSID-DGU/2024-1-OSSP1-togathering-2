import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'

type Props = {
  groupName: string
  type: string
  dateOfProgress: string
  courseId: number
}

type Type = {
  groupId: number
}

export const postGroupCreate = async (value: Props) => {
  return commonAxios.post('/group/create', value, {}).then((res: AxiosResponse<CommonResponse<Type>>) => {
    return res
  })
}
