import { FC } from 'react'
import { Root } from './styled'

type SelectPloggingCourseProps = {
  className?: string
}

export const SelectPloggingCourse: FC<SelectPloggingCourseProps> = ({ className }) => {
  return <Root className={className}>SelectPloggingCourse</Root>
}
