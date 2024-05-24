import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 18px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const SubtitleTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    font-weight: 500;
    color: ${lightTheme.colors.base['400']};
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const ContentButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const ContentButton = styled(Button)`
  width: 100%;
`

export const ContentButtonTypo = styled(Typography)`
  &&& {
    font-size: 16px;
  }
`
