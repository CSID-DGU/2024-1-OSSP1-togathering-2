import { FC } from 'react'
import { Root } from './styled'

type PloggingCourseListPageProps = {
  className?: string
}

export const PloggingCourseListPage: FC<PloggingCourseListPageProps> = ({ className }) => {
  return <Root className={className}>PloggingCourseListPage</Root>
}
