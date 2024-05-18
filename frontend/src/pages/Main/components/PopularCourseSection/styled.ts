import { Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 18px;
    font-weight: 500;
    color: ${lightTheme.colors.base['700']};
  }
`

export const CourseContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding-bottom: 10px;
  overflow-x: scroll;
`
