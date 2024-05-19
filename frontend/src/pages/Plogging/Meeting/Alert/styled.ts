import { IconSunWind } from '@tabler/icons-react'
import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 60px;
  box-sizing: border-box;
`

export const SubtitleContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`

export const SubtitleCircle = styled.div`
  width: 28px;
  height: 28px;
  background: ${lightTheme.colors.primary['500']};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`

export const SubtitleCircleTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  color: ${lightTheme.colors.base['50']};
`

export const SubtitleTypo = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  color: ${lightTheme.colors.base['700']};
`

export const WeatherContainer = styled.div`
  width: 100%;
  background: ${lightTheme.colors.base['200']};

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 20px;
  border-radius: 8px;
`

export const WeatherIcon = styled(IconSunWind)`
  color: ${lightTheme.colors.base['600']};
`

export const WeatherTypoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const WeatherAddressTypo = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  color: ${lightTheme.colors.base['700']};
`
export const WeatherTemperatureTypo = styled(Typography)`
  font-size: 14px;
  color: ${lightTheme.colors.base['600']};
`

export const AlertContainer = styled.div`
  width: 100%;
  background: ${lightTheme.colors.base['200']};

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 20px 10px;
  padding-bottom: 5px;
  box-sizing: border-box;
  border-radius: 8px;
`

export const AlertContentTypo = styled(Typography)`
  color: ${lightTheme.colors.base['700']};
  font-size: 16px;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const StartButton = styled(Button)`
  width: 100%;
  height: 50px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export const StartButtonTypo = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: ${lightTheme.colors.base[50]};
`
