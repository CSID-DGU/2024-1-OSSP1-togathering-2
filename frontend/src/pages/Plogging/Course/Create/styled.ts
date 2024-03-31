import { Select, Typography } from 'antd'
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

export const InitialAddressSearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledInput = styled.input`
  width: 200px;
  padding: 4px;
  border: 1px solid #111;
  border-radius: 4px;
`

export const StyledButton = styled.button`
  padding: 4px;
`

export const CourseEditorContainer = styled.div`
  height: 350px;
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  margin-top: 10px;
`

export const CourseEditorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 10px;
  border: 1px #000 solid;
  border-radius: 4px;
`

export const CourseEditorContentContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CourseEditorIsFlagContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const ResultContainer = styled.p`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  word-break: break-all;
`
