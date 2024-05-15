import { Header } from 'components/Header'
import { SelectPloggingCourse } from 'components/SelectPloggingCourse'
import { FC } from 'react'
import { ContentContainer, Root, SubtitleCircle, SubtitleCircleTypo, SubtitleContainer, SubtitleTypo } from './styled'

type PloggingSoloCreatePageProps = {
  className?: string
}

export const PloggingSoloCreatePage: FC<PloggingSoloCreatePageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Header title={'플로깅 혼자 진행하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        <SubtitleTypo>어떤 코스에서 플로깅을 즐겨볼까요?</SubtitleTypo>
      </SubtitleContainer>
      <ContentContainer>
        <SelectPloggingCourse />
      </ContentContainer>
    </Root>
  )
}
