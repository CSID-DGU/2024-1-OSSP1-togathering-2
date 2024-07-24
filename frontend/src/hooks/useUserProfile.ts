import { USER_ACCESS_TOKEN_KEY } from 'constants/user'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { loadLocalStorage } from 'utils/handleLocalStorage'

export const useUserProfile = () => {
  const accessToken = loadLocalStorage(USER_ACCESS_TOKEN_KEY)
  const [userProfile, setUserProfile] = useState()

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
