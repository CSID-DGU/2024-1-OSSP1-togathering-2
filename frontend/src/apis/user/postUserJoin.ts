import { commonAxios } from 'apis/common'

type Props = {
  nickname: string
  password: string
  user_address: string
  username: string
}

export const postUserJoin = (value: Props) => {
  commonAxios.post('/user/join', value, {}).then((res) => {
    console.log({ res })
  })
}
