import { Button, Switch, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const KakaoMapContainer = styled.div<{ isDetail: boolean }>`
  width: 100%;
  height: ${(props) => (props.isDetail ? '300px' : '200px')};
  border: 1px #d9d9d9 solid;
  border-radius: ${(props) => (props.isDetail ? '4px' : '4px 4px 0 0')};
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`

export const KakaoMapMenuContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 2;
`

export const MapMarkerContentContainer = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MapMarkerContentTypo = styled(Typography)`
  &&& {
    display: inline;
    font-size: 12px;
    color: #999;
  }
`

export const KakaoMapMenuSwitch = styled(Switch)``
export const MenuContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px #d9d9d9 solid;
  border-top: 0;
  padding: 0 10px;
`

export const NameTypo = styled(Typography)`
  font-size: 14px;
  color: #777;
`

export const SelectButton = styled(Button)`
  background: ${lightTheme.colors.primary['600']};
`
export const SelectButtonTypo = styled(Typography)`
  color: ${lightTheme.colors.base['50']};
`

export const MeetingInfoContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`
