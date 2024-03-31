import { FC, ReactNode } from 'react'
import { Container, Root } from './styled'

type CommonContainerProps = {
  children: ReactNode
}

export const CommonContainer: FC<CommonContainerProps> = ({ children }) => {
  return (
    <Root>
      <Container>{children}</Container>
    </Root>
  )
}
