import { RightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { Button as CommonButton } from 'components/Button'
import styled from 'styled-components'
import { darkTheme, lightTheme } from 'styles/theme'

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
  cursor: pointer;
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

export const PloggingMapContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const PloggingMapTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PloggingMapTitleTypo = styled(Typography)`
  &&& {
    font-size: 18px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const PloggingMapWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${lightTheme.colors.base['200']};
  box-sizing: border-box;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-top: 10px;
`

export const PloggingMapButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`

export const PloggingMapButton = styled(CommonButton)`
  width: 100%;
`

export const PloggingMeetingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const PloggingMeetingTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PloggingMeetingTitleTypo = styled(Typography)`
  &&& {
    font-size: 18px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const PloggingMeetingCardContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  overflow: scroll;
  margin-top: 10px;
`

export const PloggingMeetingCard = styled.div`
  width: 180px;
  min-width: 180px;
  height: 100px;
  background: ${lightTheme.colors.body};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 20px;
  box-sizing: border-box;
  border: 2px ${darkTheme.colors.base['800']} solid;
  border-radius: 8px;
  cursor: pointer;
`

export const PloggingMeetingCardTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PloggingMeetingCardTitleTypo = styled(Typography)`
  &&& {
    font-size: 14px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const PloggingMeetingCardTitleArrowIcon = styled(RightOutlined)`
  &&& {
    font-size: 11px;
  }
`

export const PloggingMeetingCardContentTypo = styled(Typography)`
  &&& {
    font-size: 22px;
    font-weight: 500;
    color: ${darkTheme.colors.base['400']};
  }
`
