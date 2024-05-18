import Meta from 'antd/es/card/Meta'
import { MeetingCategoryChip } from 'components/MeetingCategoryChip'
import { PloggingCourseViewer } from 'pages/Plogging/Course/Create/components/PloggingCourseViewer'
import { FC } from 'react'
import { CourseItemType } from 'types/plogging'
import { DescriptionContainer, Root, TitleTypo, ViewerWrapper } from './styled'

type CourseCardProps = {
  className?: string
  courseItem: CourseItemType
}

export const CourseCard: FC<CourseCardProps> = ({ className, courseItem }) => {
  const name = courseItem.name ?? '요즘 뜨는 플로깅 코스'

  return (
    <Root
      className={className}
      hoverable
      cover={
        <ViewerWrapper>
          <PloggingCourseViewer courseItem={courseItem} hideInfo={true} />
        </ViewerWrapper>
      }
    >
      <Meta
        title={<TitleTypo>{name}</TitleTypo>}
        description={
          <DescriptionContainer>
            <MeetingCategoryChip category={'PLOGGING'} />
          </DescriptionContainer>
        }
      />
    </Root>
  )
}
