import { IconCheck } from '@tabler/icons-react'
import { Header } from 'components/Header'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AlertContainer,
  AlertContentTypo,
  ButtonContainer,
  Root,
  StartButton,
  StartButtonTypo,
  SubtitleCircle,
  SubtitleCircleTypo,
  SubtitleContainer,
  SubtitleTypo,
  WeatherAddressTypo,
  WeatherContainer,
  WeatherIcon,
  WeatherTemperatureTypo,
  WeatherTypoContainer,
} from './styled'

type PloggingSoloAlertPageProps = {
  className?: string
}

export const PloggingSoloAlertPage: FC<PloggingSoloAlertPageProps> = ({ className }) => {
  const { state } = useLocation()

  const navigate = useNavigate()

  const onClickCheckButton = () => {
    navigate('/plogging/solo/progress', { state })
  }

  return (
    <Root className={className}>
      <Header title={'혼자하기'} showBackButton />
      <SubtitleContainer>
        <SubtitleCircle>
          <SubtitleCircleTypo>4</SubtitleCircleTypo>
        </SubtitleCircle>
        <SubtitleTypo>
          플로깅을 시작하기 전에,
          <br />꼭 읽어봐야 하는 준비 사항을 알려드려요!
        </SubtitleTypo>
      </SubtitleContainer>
      <WeatherContainer>
        <WeatherIcon size={36} />
        <WeatherTypoContainer>
          <WeatherAddressTypo>서울특별시 중구</WeatherAddressTypo>
          <WeatherTemperatureTypo>9℃</WeatherTemperatureTypo>
        </WeatherTypoContainer>
      </WeatherContainer>
      <AlertContainer>
        <ul>
          <li>
            <AlertContentTypo>
              쓰레기를 담을 봉투, 장갑과 집게 준비해요.
              <br />
              여러 번 재사용할 수 있는 소재이면 더 좋아요!
            </AlertContentTypo>
          </li>
          <li>
            <AlertContentTypo>편한 옷차림과 신발은 필수에요. </AlertContentTypo>
          </li>
          <li>
            <AlertContentTypo>
              쓰레기를 주울 땐 허리가 아닌
              <br />
              엉덩이, 허벅지 힘으로 들어야 다치치 않아요.
            </AlertContentTypo>
          </li>
          <li>
            <AlertContentTypo>들고 간 봉투가 찢어지지 않을 정도로 담아주세요.</AlertContentTypo>
          </li>
          <li>
            <AlertContentTypo>
              이번 플로깅은 낮에 이루어져요.
              <br />
              자외선에 오래 노출되지 않도록 주의하세요.
            </AlertContentTypo>
          </li>
        </ul>
      </AlertContainer>
      <ButtonContainer>
        <StartButton type={'primary'} onClick={onClickCheckButton}>
          <IconCheck />
          <StartButtonTypo> 알겠어요</StartButtonTypo>
        </StartButton>
      </ButtonContainer>
    </Root>
  )
}
