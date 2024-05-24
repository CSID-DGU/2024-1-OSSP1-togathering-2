import { Button, Typography } from 'antd'
import Input from 'antd/es/input/Input'
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
  width: 40px;
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

export const Step2CaptionTypo = styled(Typography)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  color: ${lightTheme.colors.base['500']};
`

export const Step2Input = styled(Input)`
  width: 100px;
  font-size: 20px;
  text-align: center;
`
