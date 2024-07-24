import { commonAxios, CommonResponse } from 'apis/common'
import { AxiosResponse } from 'axios'
import { USER_ACCESS_TOKEN_KEY } from 'constants/user'
import { MeetingCategoryType } from 'types/meeting'
import { loadLocalStorage } from 'utils/handleLocalStorage'

type Props = {
  groupName: string
  type: MeetingCategoryType
  dateOfProgress: string
  courseId: number
}

type Type = {
  groupId: number
}

export const postGroupCreate = async (value: Props) => {
  const accessToken = loadLocalStorage(USER_ACCESS_TOKEN_KEY)

  return commonAxios
    .post('/group/create/', value, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res: AxiosResponse<CommonResponse<Type>>) => {
      return res
    })
}
