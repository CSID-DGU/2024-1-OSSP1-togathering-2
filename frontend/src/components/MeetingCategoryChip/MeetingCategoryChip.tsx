import { FC } from 'react'
import { MeetingCategoryType } from 'types/meeting'
import { Root, TitleTypo } from './styled'

type MeetingCategoryChipProps = {
  className?: string
  category: MeetingCategoryType
}

export const MeetingCategoryChip: FC<MeetingCategoryChipProps> = ({ className, category }) => {
  if (category === 'BICYCLE') {
    return (
      <Root className={className} background={'#4CAF50'}>
        <TitleTypo>자전거</TitleTypo>
      </Root>
    )
  }

  if (category === 'RUNNING') {
    return (
      <Root className={className} background={'#FF5722'}>
        <TitleTypo>러닝</TitleTypo>
      </Root>
    )
  }

  if (category === 'WALK') {
    return (
      <Root className={className} background={'#3F51B5'}>
        <TitleTypo>산책</TitleTypo>
      </Root>
    )
  }

  if (category === 'PLOGGING') {
    return (
      <Root className={className} background={'#009688'}>
        <TitleTypo>플로깅</TitleTypo>
      </Root>
    )
  }

  return (
    <Root className={className} background={'#9E9E9E'}>
      <TitleTypo>기타</TitleTypo>
    </Root>
  )
}
