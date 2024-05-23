import { MeetingCard } from 'components/MeetingCard'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import dayjs from 'dayjs'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MeetingCategoryType } from 'types/meeting'
import { MeetingCardWrapper, MeetingContainer, Root, TitleTypo } from './styled'

type LatestMeetingSectionProps = {
  className?: string
}

export const LatestMeetingSection: FC<LatestMeetingSectionProps> = ({ className }) => {
  const navigate = useNavigate()
  const onSelectPloggingCourse = (id: number, category: MeetingCategoryType) => () => {
    navigate('/plogging/meeting/confirm', { state: { ploggingMeetingId: id, selectedCategory: category } })
  }
  const washedMeetingList = (() => {
    let newMeetingList = ALL_MEETING_LIST_SAMPLE.sort((a, b) => (dayjs(a.createdAt).isAfter(b.createdAt) ? 1 : -1))
    return newMeetingList
  })().filter((_, index) => index < 8)

  return (
    <Root className={className}>
      <TitleTypo>최근에 개설된 모임</TitleTypo>
      <MeetingContainer>
        {washedMeetingList.map((meetingItem) => (
          <MeetingCardWrapper
            key={`meeting_card_${meetingItem.id}`}
            onClick={onSelectPloggingCourse(meetingItem.id, meetingItem.category)}
          >
            <MeetingCard
              id={meetingItem.id}
              category={meetingItem.category}
              name={meetingItem.name}
              maxCount={meetingItem.maxCount}
            />
          </MeetingCardWrapper>
        ))}
      </MeetingContainer>
    </Root>
  )
}
