import { LeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { COMMON_CONTAINER_WIDTH } from 'constants/layout'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

type HeaderProps = {
  showBackButton?: boolean
  onBackButtonClick?: () => void
  showLogo?: true
  title?: string
}

export const Header: FC<HeaderProps> = ({ showBackButton, onBackButtonClick, title, showLogo }) => {
  const navigate = useNavigate()

  const onClickBackButton = () => {
    if (!onBackButtonClick) {
      navigate(-1)
      return
    }
    onBackButtonClick()
  }

  return (
    <Root showBackButton={showBackButton}>
      {showBackButton && (
        <Button onClick={onClickBackButton} shape={'circle'}>
          <LeftOutlined />
        </Button>
      )}
      {title && <h1 className="line-clamp-1">{title}</h1>}
      {showLogo && <h1 className="logo">TOGATHERING</h1>}
    </Root>
  )
}

const Root = styled.header<{ showBackButton?: boolean }>`
  position: fixed;
  z-index: 10;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 0.375rem;

  width: 100%;
  max-width: ${COMMON_CONTAINER_WIDTH}px;
  height: 3rem;
  padding-inline: 1.25rem;
  ${(props) => props.showBackButton && 'padding-left: 0.75rem;'}

  background-color: ${lightTheme.colors.body};
  color: ${lightTheme.colors.base['700']};

  & > button {
    transition: background-color 0.2s ease-in-out, scale 0.2s ease-in-out;
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.25rem;
    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 0;

    &:hover {
      background-color: ${lightTheme.colors.base['200']};
    }

    &:active {
      scale: 0.95;
    }
  }

  & > h1 {
    font-size: 18px;
    line-height: 1.5rem;
    font-weight: 700;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 10px;
    margin-left: 5px;
  }

  .logo {
    color: ${lightTheme.colors.primary['600']};
  }
`
