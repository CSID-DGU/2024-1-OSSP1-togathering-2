import { RightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { darkTheme, lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 40px;
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
  margin-top: 20px;
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

export const CurrentHistoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const CurrentHistoryTitleTypo = styled(Typography)`
  &&& {
    font-size: 18px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const CurrentHistoryCardContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  overflow: scroll;
  margin-top: 10px;
`

export const CurrentHistoryCard = styled.div`
  width: 180px;
  min-width: 180px;
  height: 100px;
  background: ${darkTheme.colors.base['900']};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 20px;
  box-sizing: border-box;
  border-radius: 8px;
`

export const CurrentHistoryCardTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CurrentHistoryCardTitleTypo = styled(Typography)`
  &&& {
    font-size: 14px;
    font-weight: 500;
    color: ${lightTheme.colors.base['500']};
  }
`

export const CurrentHistoryCardTitleArrowIcon = styled(RightOutlined)`
  &&& {
    font-size: 11px;
  }
`

export const CurrentHistoryCardContentTypo = styled(Typography)`
  &&& {
    font-size: 22px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`
