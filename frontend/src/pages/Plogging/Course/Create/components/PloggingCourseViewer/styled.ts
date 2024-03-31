import { Switch, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const KakaoMapContainer = styled.div`
  width: 100%;
  height: 300px;
  border: 1px #eee solid;
  border-radius: 4px 4px 0 0;
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
  height: 45px;
  display: flex;
  align-items: center;
  border: 1px #d9d9d9 solid;
  border-top: 0;
  padding: 0 15px;
`

export const NameTypo = styled(Typography)`
  font-size: 14px;
  color: #777;
`
