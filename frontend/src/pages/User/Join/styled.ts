import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .MainFrame {
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
  }
`
