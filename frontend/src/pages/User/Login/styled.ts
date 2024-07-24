import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .PageTitle {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
    color: ${lightTheme.colors.primary['600']};
  }

  .Mainframe {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 75%;
    height: 350px;
    margin-bottom: 10px;

    border: 2px solid ${lightTheme.colors.base['200']};
    border-radius: 15px;
    background-color: ${lightTheme.colors.base['50']};
  }

  .LoginBox {
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .InputBox {
    height: 30px;
    margin: 3px;

    border: 2px solid ${lightTheme.colors.primary['600']};
    border-radius: 8px;
    padding: 0 5px;
  }
  .InputBox:focus {
    outline: none;
  }
  .InputBox::placeholder {
    color: ${lightTheme.colors.base['300']};
  }

  .LoginButton {
    width: 185px;
    height: 30px;
    margin-top: 3px;
    padding-bottom: 2px;

    color: #ffffff;
    border: 1px solid ${lightTheme.colors.primary['600']};
    border-radius: 8px;
    background-color: ${lightTheme.colors.primary['600']};
  }

  .DivLine {
    width: 180px;
    height: 0px;

    margin: 20px auto;
    border-top: 1px solid ${lightTheme.colors.base['400']};
  }
  .DivLine:after {
    content: '또는';

    padding: 1px 5px;
    position: relative;
    top: -9px;
    left: calc(50% - 20px);

    color: ${lightTheme.colors.base['400']};
    background-color: ${lightTheme.colors.base['50']};
  }

  .SNSLogin {
    width: 185px;
    height: 30px;
    margin-bottom: 8px;

    font-size: 15px;
    color: ${lightTheme.colors.primary['600']};
    border: 2px solid ${lightTheme.colors.primary['600']};
    border-radius: 8px;
    background-color: #ffffff;
  }

  .GotoFindPW {
    font-size: 14px;
  }

  .Subframe {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 75%;
    height: 60px;

    font-size: 14px;
    line-height: 125%;
    color: ${lightTheme.colors.base['500']};

    border: 2px solid ${lightTheme.colors.base['200']};
    border-radius: 10px;
    background-color: ${lightTheme.colors.base['50']};
  }

  .LinkStyle {
    text-align: center;
    color: ${lightTheme.colors.primary['600']};
    text-decoration: none;
  }
  .LinkStyle:visited {
    text-decoration: none;
  }
`
