/* eslint-disable */
import { tmapRoutePedestrian } from 'apis/tmap/tmapRoutePedestrian'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useState } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { CoordinateItemType, CourseCoordinateListType } from 'types/plogging'
import { AddressSelectOptionListType } from '../../type'
import {
  CourseEditorAlertTypo,
  CourseEditorContainer,
  CourseEditorDeleteButton,
  CourseEditorDisplayButton,
  CourseEditorWrapper,
  CourseSaveButton,
  InitialAddressButton,
  InitialAddressInput,
  InitialAddressInputContainer,
  InitialAddressSearchBarContainer,
  InitialAddressSelect,
  KakaoMapContainer,
  KakaoMapMenuContainer,
  KakaoMapMenuSwitch,
  MapMarkerContentContainer,
  MapMarkerContentTypo,
  MenuContainer,
  Root,
  StopoverCreateButton,
} from './styled'

type PloggingCourseCreateAddressProps = {
  className?: string
  onSave: (courseItem: CourseCoordinateListType) => void
}

export const PloggingCourseCreateAddress: FC<PloggingCourseCreateAddressProps> = ({ className, onSave }) => {
  const [initialAddressKeyword, setInitialAddressKeyword] = useState<string>('')
  const [initialAddressCoordinate, setInitialAddressCoordinate] = useState<CoordinateItemType | null>(null)
  const [initialAddressSelectOptions, setInitialAddressSelectOptions] = useState<AddressSelectOptionListType>([])

  const [courseCoordinateList, setCourseCoordinateList] = useState<CourseCoordinateListType>([])
  const { state: courseCoordinateFlagActivate, toggleState: toggleCourseCoordinateFlagActivate } =
    useBooleanState(false)

  const placesSearchCB = (data: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setInitialAddressSelectOptions(
        data.map((addressItem: any) => ({
          label: `${addressItem.place_name}(${addressItem.address_name})`,
          value: JSON.stringify({
            lat: addressItem.y,
            lng: addressItem.x,
            name: `${addressItem.place_name}(${addressItem.address_name})`,
          }),
        }))
      )
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.')
      return
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.')
      return
    }
  }

  const onClickSearchInitialAddress = () => {
    if (kakao) {
      var ps = new kakao.maps.services.Places()

      if (!initialAddressKeyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!')
        return false
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(initialAddressKeyword, placesSearchCB)
    }
  }

  const onKeyPressEnterInitialAddress = (e: any) => {
    if (e.key === 'Enter') {
      onClickSearchInitialAddress()
      return
    }
  }

  const onChangeSelectInitialAddressList = (value: string) => {
    setInitialAddressCoordinate(JSON.parse(value))
    return
  }

  const onDeleteStopoverItem = (id: number) => () => {
    setCourseCoordinateList((prev) => prev.filter((_value, index) => index !== id))
  }

  const onClickButtonStopoverCreate = () => {
    if (initialAddressCoordinate !== null) {
      let newCoordinate = initialAddressCoordinate

      if (courseCoordinateList.length === 0) {
        setCourseCoordinateList((prev) => [...prev, { ...newCoordinate, isFlag: true, isPassed: true }])
        setInitialAddressKeyword('')
        setInitialAddressCoordinate(null)
        setInitialAddressSelectOptions([])
        return
      }

      tmapRoutePedestrian({
        start: courseCoordinateList[courseCoordinateList.length - 1],
        end: initialAddressCoordinate,
      }).then((response) => {
        setCourseCoordinateList((prev) => [...prev, ...response])
        setInitialAddressKeyword('')
        setInitialAddressCoordinate(null)
        setInitialAddressSelectOptions([])
      })
      return
    }
  }

  const onClickButtonStopoverMoreDetails = (id: number) => () => {
    if (courseCoordinateList.length > id - 1 && courseCoordinateList[id]?.name) {
      alert(courseCoordinateList[id]?.name)
    }
  }

  const onClickButtonSave = () => {
    onSave(courseCoordinateList)
    return
  }

  return (
    <Root className={className}>
      <InitialAddressSearchBarContainer>
        <InitialAddressInputContainer>
          <InitialAddressInput
            size={'large'}
            value={initialAddressKeyword}
            onChange={(e: any) => setInitialAddressKeyword(e.target.value)}
            placeholder={
              courseCoordinateList.length === 0
                ? '시작하고 싶은 주소를 입력해주세요.'
                : '경유하고 싶은 주소를 입력해주세요.'
            }
            onKeyPress={onKeyPressEnterInitialAddress}
          />
          <InitialAddressButton size={'large'} type="primary" onClick={onClickSearchInitialAddress}>
            검색
          </InitialAddressButton>
        </InitialAddressInputContainer>
        {initialAddressSelectOptions.length > 0 && (
          <>
            <InitialAddressSelect
              options={initialAddressSelectOptions}
              placeholder={
                courseCoordinateList.length === 0
                  ? '시작하고 싶은 정확한 주소를 선택해주세요.'
                  : '경유하고 싶은 정확한 주소를 선택해주세요.'
              }
              size={'large'}
              onChange={onChangeSelectInitialAddressList as any}
            />
            <StopoverCreateButton
              disabled={initialAddressCoordinate === null}
              size={'large'}
              type={'primary'}
              onClick={onClickButtonStopoverCreate}
            >
              경로 추가하기
            </StopoverCreateButton>
          </>
        )}
      </InitialAddressSearchBarContainer>

      {courseCoordinateList.length > 0 && (
        <>
          <KakaoMapContainer>
            <Map
              center={initialAddressCoordinate ?? courseCoordinateList[courseCoordinateList.length - 1]}
              style={{
                width: '100%',
                height: '400px',
              }}
              level={5}
            >
              <Polyline
                path={courseCoordinateList}
                strokeWeight={5}
                strokeColor={'#50bcdf'}
                strokeOpacity={0.7}
                strokeStyle={'solid'}
              />
              {courseCoordinateList.map(
                (value, index) =>
                  (index === 0 || index === courseCoordinateList.length - 1 || courseCoordinateFlagActivate) &&
                  value.isFlag && (
                    <MapMarker position={value} key={`flag_list_${index}`} clickable={true}>
                      {courseCoordinateFlagActivate && (
                        <MapMarkerContentContainer>
                          {index === 0 && <MapMarkerContentTypo>출발지점</MapMarkerContentTypo>}
                          {index !== 0 && index !== courseCoordinateList.length - 1 && (
                            <MapMarkerContentTypo>경유지 {index + 1}</MapMarkerContentTypo>
                          )}
                          {index !== 0 && index === courseCoordinateList.length - 1 && (
                            <MapMarkerContentTypo>종착지점</MapMarkerContentTypo>
                          )}
                        </MapMarkerContentContainer>
                      )}
                    </MapMarker>
                  )
              )}
            </Map>
            <KakaoMapMenuContainer>
              <KakaoMapMenuSwitch value={courseCoordinateFlagActivate} onClick={toggleCourseCoordinateFlagActivate} />
            </KakaoMapMenuContainer>
          </KakaoMapContainer>
          <CourseEditorContainer>
            {courseCoordinateList.length > 0 &&
              courseCoordinateList.map((courseCoordinateItem, index) => (
                <CourseEditorWrapper
                  key={`course_coordinate_item_${courseCoordinateItem.lat}_${courseCoordinateItem.lng}__${index}`}
                >
                  <CourseEditorDisplayButton onClick={onClickButtonStopoverMoreDetails(index)}>
                    {index === 0 && '출발지점 '}
                    {index !== 0 && index !== courseCoordinateList.length - 1 && `경유지 ${index + 1} `}
                    {index !== 0 && index === courseCoordinateList.length - 1 && '종착지점 '}
                    {courseCoordinateItem?.name && `: ${courseCoordinateItem.name}`}
                  </CourseEditorDisplayButton>
                  {index !== 0 && (
                    <CourseEditorDeleteButton type={'primary'} danger onClick={onDeleteStopoverItem(index)}>
                      삭제하기
                    </CourseEditorDeleteButton>
                  )}
                </CourseEditorWrapper>
              ))}
            {courseCoordinateList.length === 1 && (
              <CourseEditorAlertTypo>경유지를 추가하여 코스를 완성해주세요!</CourseEditorAlertTypo>
            )}
          </CourseEditorContainer>
        </>
      )}
      {courseCoordinateList.length > 1 && (
        <MenuContainer>
          <CourseSaveButton
            disabled={courseCoordinateList.length <= 1}
            type={'primary'}
            size={'large'}
            onClick={onClickButtonSave}
          >
            저장하기
          </CourseSaveButton>
        </MenuContainer>
      )}
    </Root>
  )
}
