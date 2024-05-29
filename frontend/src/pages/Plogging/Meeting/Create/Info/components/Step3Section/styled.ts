import { Button, Input, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

export const ContentInput = styled(Input)``

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const SubmitButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
`
