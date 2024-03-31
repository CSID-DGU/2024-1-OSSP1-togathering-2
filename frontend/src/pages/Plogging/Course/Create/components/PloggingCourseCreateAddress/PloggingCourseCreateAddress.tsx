/* eslint-disable */
import { FC } from 'react'
import { CourseCoordinateListType } from 'types/plogging'
import { Root } from './styled'

type PloggingCourseCreateAddressProps = {
  className?: string
  onSave: (courseItem: CourseCoordinateListType) => void
}

export const PloggingCourseCreateAddress: FC<PloggingCourseCreateAddressProps> = ({ className }) => {
  return <Root className={className}>PloggingCourseCreateAddress</Root>
}
