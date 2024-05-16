import { Button, Input, Select, Space, Switch, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const InitialAddressSearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

export const InitialAddressInputContainer = styled(Space.Compact)`
  width: 100%;
`

export const InitialAddressInput = styled(Input)``
export const InitialAddressButton = styled(Button)`
  background: ${lightTheme.colors.primary['600']};
`

export const InitialAddressSelect = styled(Select)`
  width: 100%;
`

export const KakaoMapContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px #eee solid;
  border-radius: 4px;
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

export const CourseEditorContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  padding: 10px;
  border: 1px #d9d9d9 solid;
  border-radius: 4px;

  overflow-y: scroll;
  box-sizing: border-box;
`

export const CourseEditorAlertTypo = styled(Typography)`
  color: #999;
`

export const CourseEditorWrapper = styled(Space.Compact)`
  width: 100%;
`

export const CourseEditorContentContainer = styled.div`
  display: flex;
  align-items: center;

  border: 1px #000 solid;
`
export const CourseEditorDisplayButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`

export const CourseEditorDeleteButton = styled(Button)``

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const CourseSaveButton = styled(Button)`
  width: 100%;
  background: ${lightTheme.colors.primary['600']};
`
