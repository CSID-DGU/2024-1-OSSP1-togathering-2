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
} from './styled'

type PloggingCourseCreateManualProps = {
  className?: string
  onSave: (courseItem: CourseCoordinateListType) => void
  newCoordinateList?: any[]
}

export const PloggingCourseCreateManual: FC<PloggingCourseCreateManualProps> = ({
  className,
  onSave,
  newCoordinateList,
}) => {
  const [initialAddressKeyword, setInitialAddressKeyword] = useState<string>('')
  const [initialAddressCoordinate, setInitialAddressCoordinate] = useState<CoordinateItemType | null>(
    newCoordinateList ? newCoordinateList[0] : null
  )
  const [initialAddressSelectOptions, setInitialAddressSelectOptions] = useState<AddressSelectOptionListType>([])

  const [courseCoordinateList, setCourseCoordinateList] = useState<CourseCoordinateListType>(newCoordinateList ?? [])
  const { state: courseCoordinateFlagActivate, toggleState: toggleCourseCoordinateFlagActivate } =
    useBooleanState(false)

  const placesSearchCB = (data: any, status: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setInitialAddressSelectOptions(
        data.map((addressItem: any) => ({
          label: `${addressItem.place_name}(${addressItem.address_name})`,
          value: `${addressItem.address_name}`,
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
    if (kakao) {
      var geocoder = new kakao.maps.services.Geocoder()
      geocoder.addressSearch(value, function (result: any, status) {
        if (status === kakao.maps.services.Status.OK) {
          if (result) {
            const newCoordinate = { lat: +result[0].y, lng: +result[0].x }
            setInitialAddressCoordinate({ ...newCoordinate })
            setCourseCoordinateList([{ ...newCoordinate, isFlag: true, isPassed: true }])
          }
        }
      })
    }
    return
  }

  const onCreateCourseCoordinateItem = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    if (!target) {
      return
    }
    const newCourseCoordinateItem = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    }

    tmapRoutePedestrian({
      start: courseCoordinateList[courseCoordinateList.length - 1],
      end: newCourseCoordinateItem,
    }).then((response) => {
      setCourseCoordinateList((prev) => [...prev, ...response])
    })
  }

  const onDeleteCourseCoordinateItem = (id: number) => () => {
    setCourseCoordinateList((prev) => prev.filter((_value, index) => index !== id))
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
            placeholder={'시작하고 싶은 주소를 입력해주세요.'}
            onKeyPress={onKeyPressEnterInitialAddress}
          />
          <InitialAddressButton size={'large'} type="primary" onClick={onClickSearchInitialAddress}>
            입력
          </InitialAddressButton>
        </InitialAddressInputContainer>
        {initialAddressSelectOptions.length > 0 && (
          <InitialAddressSelect
            options={initialAddressSelectOptions}
            placeholder={'시작하고 싶은 정확한 주소를 선택해주세요.'}
            size={'large'}
            onChange={onChangeSelectInitialAddressList as any}
          />
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
              level={4}
              onClick={(target, mouseEvent) => onCreateCourseCoordinateItem(target, mouseEvent)}
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
            {courseCoordinateList.length === 1 && (
              <CourseEditorAlertTypo>지도를 클릭하여 코스를 완성해주세요!</CourseEditorAlertTypo>
            )}
            {courseCoordinateList.length > 1 &&
              courseCoordinateList.map((courseCoordinateItem, index) => (
                <CourseEditorWrapper
                  key={`course_coordinate_item_${courseCoordinateItem.lat}_${courseCoordinateItem.lng}__${index}`}
                >
                  <CourseEditorDisplayButton>경유지 {index + 1}</CourseEditorDisplayButton>
                  <CourseEditorDeleteButton type={'primary'} danger onClick={onDeleteCourseCoordinateItem(index)}>
                    삭제하기
                  </CourseEditorDeleteButton>
                </CourseEditorWrapper>
              ))}
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
            경로 입력 완료하기
          </CourseSaveButton>
        </MenuContainer>
      )}
    </Root>
  )
}
