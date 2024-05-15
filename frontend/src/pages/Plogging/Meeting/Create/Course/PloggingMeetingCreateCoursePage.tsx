import { FC } from 'react'
import { Root } from './styled'

type PloggingMeetingCreateCoursePageProps = {
  className?: string
}

export const PloggingMeetingCreateCoursePage: FC<PloggingMeetingCreateCoursePageProps> = ({ className }) => {
  return <Root className={className}>PloggingMeetingCreateCoursePage</Root>
}
