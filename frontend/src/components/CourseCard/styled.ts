import { Card, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled(Card)`
  width: 120px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const PreviewImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 16px;
    font-weight: bold;
    color: ${lightTheme.colors.base['700']};
  }
`

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const DescriptionTypo = styled(Typography)`
  &&& {
    font-size: 14px;
    font-weight: 500;
    color: ${lightTheme.colors.base['500']};
  }
`

export const ViewerWrapper = styled.div`
  min-width: 150px;
`
