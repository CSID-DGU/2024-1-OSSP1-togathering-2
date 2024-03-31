import { Button, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 28px;
    font-weight: bold;
    color: #111;
  }
`

export const SubtitleTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    font-weight: bold;
    color: #777;
  }
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
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
