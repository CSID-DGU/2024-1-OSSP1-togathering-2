import { IconSparkles } from '@tabler/icons-react'
import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 40px;
`

export const SortConditionContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: scroll;
`

export const SortConditionChip = styled.div<{ isSelected?: boolean }>`
  min-width: fit-content;
  background: ${(props) => (props.isSelected ? lightTheme.colors.primary['600'] : lightTheme.colors.base['200'])};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
`

export const SortConditionChipTypo = styled(Typography)<{ isSelected?: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.isSelected ? '500' : '400')};
  color: ${(props) => (props.isSelected ? lightTheme.colors.base['50'] : lightTheme.colors.base['700'])};
`

export const SortConditionChipIconSparkles = styled(IconSparkles)<{ isSelected?: boolean }>`
  color: ${(props) => (props.isSelected ? lightTheme.colors.base['50'] : lightTheme.colors.base['700'])};
`

export const CourseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CreateCourseButton = styled(Button)`
  height: 45px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
export const CreateCourseButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
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
