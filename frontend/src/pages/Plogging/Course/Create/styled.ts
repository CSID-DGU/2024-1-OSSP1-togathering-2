import { Button, Divider, Select, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-bottom: 40px;
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

export const CreateTypeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const CreateTypeSelect = styled(Select)`
  width: 100%;
`

export const ContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 400px);
`

export const SeparateDivider = styled(Divider)``

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const CourseResetButton = styled(Button)`
  width: 100%;
`

export const CourseGoBackButton = styled(Button)`
  width: 100%;
`
