import { FC } from 'react'
import { LogoContainer, Root, LogoTitleTypo } from './styled'

type UserLoginPageProps = {
  className?: string
}

export const UserLoginPage: FC<UserLoginPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <LogoContainer>
        <LogoTitleTypo>같이 줍깅</LogoTitleTypo>
      </LogoContainer>
    </Root>
  )
}
