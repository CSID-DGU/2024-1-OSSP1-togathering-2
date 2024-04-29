import { COMMON_CONTAINER_MIN_WIDTH, COMMON_CONTAINER_WIDTH } from 'constants/layout'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #eee;
`

export const Container = styled.div`
  width: ${COMMON_CONTAINER_WIDTH}px;
  min-width: ${COMMON_CONTAINER_MIN_WIDTH}px;
  background: white;
  display: flex;
`
