import { Button, Select, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 80px;
  box-sizing: border-box;
`

export const SubtitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CategorySelectContainer = styled.div``

export const CategorySelect = styled(Select)`
  width: 100%;
`

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const InfoItemContainer = styled.div<{ isDivided?: boolean }>`
  width: ${(props) => (!props.isDivided ? '100%' : 'calc(50% - 5px)')};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  box-sizing: border-box;
  border: 2px ${lightTheme.colors.base['300']} solid;
  border-radius: 8px;
`

export const InfoItemTitleTypo = styled(Typography)`
  font-size: 14px;
  color: ${lightTheme.colors.base['500']};
`

export const InfoItemContentTypo = styled(Typography)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  color: ${lightTheme.colors.base['600']};
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
