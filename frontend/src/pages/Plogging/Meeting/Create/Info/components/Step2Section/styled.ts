import { Button, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`
export const Step2Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`

export const Step2Button = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Step2CountTypo = styled(Typography)`
  width: 20px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: ${lightTheme.colors.base['700']};
`

export const Step2SubmitButton = styled(Button)`
  height: 40px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const Step2SubmitButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
`
