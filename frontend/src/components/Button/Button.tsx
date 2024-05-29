import type { RequireAtLeastOne } from 'lib/utilities'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

type ButtonProps = RequireAtLeastOne<{
  text: string
  icon: any
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}> &
  RequireAtLeastOne<{
    onClick: () => void
    href: string
  }> & {
    primary?: boolean
  }

export const Button: FC<ButtonProps> = ({
  text,
  icon: Icon,
  onClick: onClickProps,
  href,
  primary,
  type,
  className,
  disabled = false,
}) => {
  const navigate = useNavigate()

  const onClick = () => {
    if (disabled) {
      return
    }

    if (href) {
      navigate(href)
      return
    }

    onClickProps && onClickProps()
  }

  return (
    <Root primary={primary} onClick={onClick} type={type ?? 'button'} className={className}>
      <>{Icon && <Icon />}</>
      <span>{text}</span>
    </Root>
  )
}

const Root = styled.button<{ primary?: boolean }>`
  min-height: 2.8rem;
  border-radius: 0.875rem;
  padding: 0.5rem 1rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  background-color: ${(props) => (props.primary ? lightTheme.colors.primary['600'] : lightTheme.colors.base['100'])};
  border: 0.0625rem solid
    ${(props) => (props.primary ? lightTheme.colors.primary['600'] : lightTheme.colors.base['200'])};
  box-shadow: ${(props) =>
    props.primary
      ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);'
      : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'};

  cursor: pointer;
  user-select: none;

  color: ${(props) => (props.primary ? 'white' : lightTheme.colors.base['600'])};
  font-size: 1.1rem;
  font-weight: 600;

  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, scale 0.2s ease-in-out;

  & > svg {
    flex: none;
  }

  &:hover {
    background-color: ${(props) => (props.primary ? lightTheme.colors.primary['700'] : lightTheme.colors.base['200'])};
    border-color: ${(props) => (props.primary ? lightTheme.colors.primary['700'] : lightTheme.colors.base['200'])};
  }

  &:active {
    scale: 0.975;
  }
`
