import { Button, Input, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 80px;
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

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const UserInput = styled(Input)``

export const EmailInput = styled(Input)``

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

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const StepBackButton = styled(Button)`
  width: 100%;
  height: 40px;
  background: ${lightTheme.colors.base['50']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export const StepBackButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  color: ${lightTheme.colors.base[700]};
`

/*.MainFrame {
    width: 65%;
    margin-top: 75px;
  }

  .PageTitle {
    font-weight: 600;
    font-size: 24px;
  }

  .Line {
    height: 1px;
    border: 1px ${lightTheme.colors.base['100']};
    background-color: ${lightTheme.colors.base['100']};
    box-shadow: 0 0 5px ${lightTheme.colors.base['100']};
  }

  .JoinBox {
    display: flex;
    flex-direction: column;
    align-content: center;

    margin-top: 20px;
    font-weight: 600;
  }

  .InputBox {
    height: 35px;
    margin-top: 4px;
    margin-bottom: 15px;
    padding: 5px;

    background-color: ${lightTheme.colors.base['50']};
    border: 2px solid ${lightTheme.colors.primary['600']};
    border-radius: 7px;
  }
  .InputBox:focus {
    outline: none;
  }
  .InputBox::placeholder {
    color: ${lightTheme.colors.base['300']};
  }

  .JoinLink {
    color: #ffffff;
    text-decoration: none;
  }

  .JoinButton {
    width: 100%;
    height: 40px;

    font-weight: 600;
    border: 2px solid ${lightTheme.colors.primary['600']};
    border-radius: 7px;
    background-color: ${lightTheme.colors.primary['600']};
  }*/
