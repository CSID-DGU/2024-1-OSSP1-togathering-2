import { Button, Divider, Input, Select, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 40px;
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

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const SubmitButtonButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export const SubmitButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  color: ${lightTheme.colors.base[50]};
`

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CreateTypeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const CreateTypeSelect = styled(Select)`
  width: 100%;
`

export const CourseNameInput = styled(Input)``

export const ContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 450px);
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
export const AIContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  box-sizing: border-box;
  border: 2px ${lightTheme.colors.base['300']} solid;
  border-radius: 8px;
`

export const AITitleTypo = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${lightTheme.colors.base['700']};
`

export const AIQuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const AIQuestionItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const AIQuestionItemTitleTypo = styled(Typography)`
  font-size: 16px;
  color: ${lightTheme.colors.base['700']};
`

export const AIQuestionItemButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`

export const AIQuestionItemButton = styled(Button)<{ isSelected: boolean }>`
  min-width: fit-content;
  background: ${(props) => (props.isSelected ? lightTheme.colors.primary['600'] : lightTheme.colors.base['200'])};
  border: ${(props) => (props.isSelected ? lightTheme.colors.primary['600'] : lightTheme.colors.base['200'])};
`

export const AIQuestionItemButtonTypo = styled(Typography)<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? lightTheme.colors.base['50'] : lightTheme.colors.base['700'])};
  &:hover {
    color: white !important;
  }
`

export const AISubmitButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`

export const AISubmitButtonTypo = styled(Typography)<{ isLoading?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isLoading ? lightTheme.colors.base['700'] : lightTheme.colors.base['50'])};
`
