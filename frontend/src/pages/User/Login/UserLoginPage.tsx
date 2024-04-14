import { FC } from 'react'
import { Root } from './styled'

type UserLoginPageProps = {
  className?: string
}

export const UserLoginPage: FC<UserLoginPageProps> = ({ className }) => {
  return <Root className={className}>UserLoginPage</Root>
}
