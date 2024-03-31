import { Select, Typography } from 'antd'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-bottom: 40px;
  box-sizing: border-box;
`

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

export const TitleTypo = styled(Typography)`
  &&& {
    font-size: 28px;
    font-weight: bold;
    color: #111;
  }
`

export const CreateTypeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const CreateTypeSelect = styled(Select)`
  width: 100%;
`
