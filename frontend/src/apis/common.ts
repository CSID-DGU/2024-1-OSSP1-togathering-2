import axios from 'axios'

export const OPEN_AI_API_KEY = process.env['REACT_APP_OPENAI_KEY']
export const API_URL = 'https://togethering.store/'

// 공통 설정을 위한 axios 인스턴스 생성
export const commonAxios = axios.create({
  baseURL: API_URL, // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
})
