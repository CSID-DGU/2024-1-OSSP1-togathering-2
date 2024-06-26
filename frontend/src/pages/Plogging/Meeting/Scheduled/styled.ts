import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 100px;
  box-sizing: border-box;
`

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 22px;
    font-weight: bold;
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

export const PloggingMeetingViewerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const PloggingMeetingViewerWrapper = styled.div``

export const NotFoundTypo = styled(Typography)`
  &&& {
    font-size: 18px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const LinkButton = styled(Button)`
  width: 100%;
  height: 45px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const LinkButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
`
