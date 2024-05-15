import { Header } from 'components/Header'
import { FC } from 'react'
import { Root } from './styled'

type PloggingSoloCreatePageProps = {
  className?: string
}

export const PloggingSoloCreatePage: FC<PloggingSoloCreatePageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Header title={'플로깅 혼자 진행하기'} showBackButton />
    </Root>
  )
}
