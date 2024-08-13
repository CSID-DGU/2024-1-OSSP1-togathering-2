import { USER_ACCESS_TOKEN_KEY } from 'constants/user'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from 'utils/handleLocalStorage'

type UserProfileType = {
  nickname: string
  user_id: number
  username: string
}

export const useUserProfile = () => {
  const accessToken = loadLocalStorage(USER_ACCESS_TOKEN_KEY)
  const [userProfile, setUserProfile] = useState<UserProfileType>()

  useEffect(() => {
    if (accessToken) {
      try {
        setUserProfile(jwtDecode(accessToken))
      } catch (error) {
        console.error('Invalid token', error)
      }
    }
  }, [])

  return { userProfile }
}
