import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ContentButton,
  ContentButtonContainer,
  ContentContainer,
  Root,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  const navigate = useNavigate()

  const onClickLoginButton = () => {
    navigate('/user/login')
    return
  }

  const onClickButtonPloggingCourseList = () => {
    navigate('/plogging/course/list')
    return
  }

  const onClickButtonPloggingGroupCreate = () => {
    return
  }

  const onClickButtonPloggingGroupJoin = () => {
    return
  }

  return (
    <Root className={className}>
      <TitleContainer>
        <TitleTypo>같이줍깅</TitleTypo>
        <SubtitleTypo>모두가 함께하는 플로깅</SubtitleTypo>
      </TitleContainer>
      <ContentContainer>
        <ContentButtonContainer>
          <ContentButton type={'dashed'} size={'large'} onClick={onClickButtonPloggingCourseList}>
            플로깅 코스 추천받기
          </ContentButton>
          <ContentButton type={'default'} size={'large'} onClick={onClickLoginButton}>
            로그인
          </ContentButton>
          <ContentButton type={'default'} size={'large'} onClick={onClickButtonPloggingGroupCreate}>
            플로깅 모임 만들기
          </ContentButton>
          <ContentButton type={'primary'} size={'large'} onClick={onClickButtonPloggingGroupJoin}>
            플로깅 모임 참여하기
          </ContentButton>
        </ContentButtonContainer>
      </ContentContainer>
    </Root>
  )
}
