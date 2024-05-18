import Meta from 'antd/es/card/Meta'
import { MeetingCategoryChip } from 'components/MeetingCategoryChip'
import { FC } from 'react'
import { MeetingCategoryType } from 'types/meeting'
import { getRandomPreviewImg } from 'utils/getRandomPreviewImg'
import { DescriptionContainer, DescriptionTypo, PreviewImg, Root, TitleTypo } from './styled'

type MeetingCardProps = {
  className?: string
  id: number
  category: MeetingCategoryType
  name: string
  maxCount: number
}

export const MeetingCard: FC<MeetingCardProps> = ({ className, category, name, maxCount }) => {
  return (
    <Root className={className} hoverable cover={<PreviewImg src={getRandomPreviewImg()} alt={`preview_img`} />}>
      <Meta
        title={<TitleTypo>{name}</TitleTypo>}
        description={
          <DescriptionContainer>
            <MeetingCategoryChip category={category} />
            <DescriptionTypo>{`최대 인원: ${maxCount}명`}</DescriptionTypo>
          </DescriptionContainer>
        }
      />
    </Root>
  )
}
