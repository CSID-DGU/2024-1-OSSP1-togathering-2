import { MeetingCard } from 'components/MeetingCard'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import dayjs from 'dayjs'
import { FC } from 'react'
import { MeetingContainer, Root, TitleTypo } from './styled'

type LatestMeetingSectionProps = {
  className?: string
}

export const LatestMeetingSection: FC<LatestMeetingSectionProps> = ({ className }) => {
  const washedMeetingList = (() => {
    let newMeetingList = ALL_MEETING_LIST_SAMPLE.sort((a, b) => (dayjs(a.createdAt).isAfter(b.createdAt) ? 1 : -1))
    return newMeetingList
  })().filter((_, index) => index < 8)

  return (
    <Root className={className}>
      <TitleTypo>최근에 개설된 모임</TitleTypo>
      <MeetingContainer>
        {washedMeetingList.map((meetingItem) => (
          <MeetingCard
            id={meetingItem.id}
            category={meetingItem.category}
            name={meetingItem.name}
            maxCount={meetingItem.maxCount}
            key={`meeting_card_${meetingItem.id}`}
          />
        ))}
      </MeetingContainer>
    </Root>
  )
}
