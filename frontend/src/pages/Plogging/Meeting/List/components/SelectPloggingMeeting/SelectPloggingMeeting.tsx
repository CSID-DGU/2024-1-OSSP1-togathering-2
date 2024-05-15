import { FC } from 'react'
import { Root } from './styled'

type SelectPloggingMeetingProps = {
  className?: string
}

export const SelectPloggingMeeting: FC<SelectPloggingMeetingProps> = ({ className }) => {
  return <Root className={className}>SelectPloggingMeeting</Root>
}
