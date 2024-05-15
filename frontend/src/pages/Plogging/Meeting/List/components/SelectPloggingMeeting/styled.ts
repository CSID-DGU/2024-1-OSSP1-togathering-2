import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CourseContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CreateMeetingButton = styled(Button)`
  height: 45px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
export const CreateMeetingButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
`
