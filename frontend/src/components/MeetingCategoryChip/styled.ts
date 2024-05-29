import { Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
`

export const TitleTypo = styled(Typography)`
  font-size: 12px;
  font-weight: bold;
  color: ${lightTheme.colors.base['50']};
`
