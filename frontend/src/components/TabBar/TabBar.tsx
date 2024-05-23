import { ClockCircleOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons'
import { COMMON_CONTAINER_MIN_WIDTH, COMMON_CONTAINER_WIDTH } from 'constants/layout'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

const items = [
  { href: '/', text: '홈', icon: HomeOutlined },
  { href: '/nearby', text: '내 근처', icon: EnvironmentOutlined },
  { href: '/meeting/scheduled', text: '예정된 모임', icon: ClockCircleOutlined },
]

export const TabBar: FC = () => {
  const { pathname } = useLocation()

  return (
    <Container count={items.length}>
      {items.map((item) => (
        <Item
          key={item.href}
          to={item.href}
          isMatched={item.href === '/' ? pathname === item.href : pathname.startsWith(item.href)}
          style={{ textDecoration: 'none' }}
        >
          <item.icon style={{ fontSize: 16 }} />
          <span>{item.text}</span>
        </Item>
      ))}
    </Container>
  )
}

const Container = styled.span<{ count: number }>`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, 1fr);
  max-width: ${COMMON_CONTAINER_WIDTH}px;
  width: 100%;
  min-width: ${COMMON_CONTAINER_MIN_WIDTH}px;
  height: calc(3.5rem + env(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));

  border-top: 0.0625rem solid ${(props) => lightTheme.colors.base['200']};
  background-color: ${(props) => lightTheme.colors.body};
`

const Item = styled(Link)<{ isMatched: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;

  color: ${(props) => (props.isMatched ? lightTheme.colors.primary['600'] : lightTheme.colors.base['500'])};
  font-size: 12px;
  font-weight: 600;
  gap: 0.325rem;

  transition: color 0.2s ease-in-out, scale 0.2s ease-in-out;

  &:hover {
    color: ${(props) => (props.isMatched ? lightTheme.colors.primary['700'] : lightTheme.colors.base['700'])};
  }

  &:active {
    scale: 0.95;
  }
`
