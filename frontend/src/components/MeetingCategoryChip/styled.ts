import { Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  border-radius: 8px;
`

export const TitleTypo = styled(Typography)`
  font-size: 10px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
`
