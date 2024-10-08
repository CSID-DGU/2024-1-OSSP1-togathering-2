import axios from 'axios'

export const OPEN_AI_API_KEY = process.env['REACT_APP_OPENAI_KEY']
// export const API_URL = 'http://127.0.0.1:8000'
export const API_URL = 'https://togathering-b78e735f1cb2.herokuapp.com'

// 공통 설정을 위한 axios 인스턴스 생성
export const commonAxios = axios.create({
  baseURL: API_URL, // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
})

export type CommonResponse<P> = {
  isSuccess: Boolean
  code: number
  message: string
  result: P
}
