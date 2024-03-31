import { CoordinateItemType } from 'types/plogging'
import { CreateTypeSelectOptionListType } from './type'

export const DEFAULT_KAKAO_MAP_ADDRESS = '서울특별시 중구 필동로1길 30'
export const DEFAULT_KAKAO_MAP_COORDINATE: CoordinateItemType = { lat: 37.5589366401553, lng: 126.998737605491 }

export const CREATE_TYPE_SELECT_OPTIONS: CreateTypeSelectOptionListType = [
  { label: '추천 경로로 만들기(주소)', value: 'ADDRESS' },
  { label: '상세하게 만들기(클릭)', value: 'CLICK' },
]
