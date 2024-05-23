import { Header } from 'components/Header'
import { FC, useState } from 'react'
import { CourseNameInput, Root, StepContainer, SubtitleCircle, SubtitleCircleTypo, SubtitleContainer } from './styled'

type CourseEditPageProps = {
  className?: string
}

export const CourseEditPage: FC<CourseEditPageProps> = ({ className }) => {
  const [courseName, setCourseName] = useState<string>('')
  const [newCoordinateList, setNewCoordinateList] = useState<any[]>([])

  return (
    <Root className={className}>
      <Header title={'나만의 코스 만들기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>1</SubtitleCircleTypo>
        </SubtitleCircle>
        <StepContainer>
          <CourseNameInput
            size={'large'}
            value={courseName}
            onChange={(e: any) => setCourseName(e.target.value)}
            placeholder={' 코스 이름을 입력해주세요.'}
          />
        </StepContainer>
      </SubtitleContainer>
    </Root>
  )
}
