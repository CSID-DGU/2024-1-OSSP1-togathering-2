import { FC } from 'react'
import { Root } from './styled'

type PloggingCreatePageProps = {
  className?: string
}

export const PloggingCreatePage: FC<PloggingCreatePageProps> = ({ className }) => {
  return <Root className={className}>PloggingCreatePage</Root>
}
