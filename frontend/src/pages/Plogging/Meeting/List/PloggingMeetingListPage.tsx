import { FC } from 'react'
import { Root } from './styled'

type PloggingMeetingListPageProps = {
  className?: string
}

export const PloggingMeetingListPage: FC<PloggingMeetingListPageProps> = ({ className }) => {
  return <Root className={className}>PloggingMeetingListPage</Root>
}
