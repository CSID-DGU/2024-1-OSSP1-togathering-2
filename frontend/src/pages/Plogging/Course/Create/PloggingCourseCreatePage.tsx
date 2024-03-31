import { FC, useState } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { CourseItemType } from 'types/plogging'
import {
  CourseEditorContainer,
  CourseEditorContentContainer,
  CourseEditorIsFlagContainer,
  CourseEditorWrapper,
  InitialAddressSearchBarContainer,
  ResultContainer,
  Root,
  StyledButton,
  StyledInput,
} from './styled'

type CourseCreateProps = {
  className?: string
}

type CourseCoordinateListType = CourseItemType[]

export const PloggingCourseCreatePage: FC<CourseCreateProps> = ({ className }) => {
  const [initialAddress, setInitialAddress] = useState<string>('대전광역시 서구 도산로 11')
  const [initialAddressCoordinate, setInitialAddressCoordinate] = useState<{ lat: number; lng: number }>({
    lat: 36.4269265013269,
    lng: 127.386979426622,
  })

  const [courseCoordinateList, setCourseCoordinateList] = useState<CourseCoordinateListType>([])

  const onClickSearchInitialAddress = () => {
    if (kakao) {
      var geocoder = new kakao.maps.services.Geocoder()

      geocoder.addressSearch(initialAddress, function (result: any, status) {
        if (status === kakao.maps.services.Status.OK) {
          if (result) {
            const newCoordinate = { lat: +result[0].y, lng: +result[0].x }
            setInitialAddressCoordinate({ ...newCoordinate })
            setCourseCoordinateList([{ ...newCoordinate, isFlag: true, isPassed: true }])
          }
        }
      })
    }
  }

  const onCreateCourseCoordinateItem = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    if (!target) {
      return
    }
    const newCourseCoordinateItem = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
      isFlag: false,
      isPassed: true,
    }
    setCourseCoordinateList((prev) => [...prev, newCourseCoordinateItem])
  }

  const onDeleteCourseCoordinateItem = (id: number) => () => {
    setCourseCoordinateList((prev) => prev.filter((_value, index) => index !== id))
  }

  const onClickCheckboxCourseIsFlag = (id: number) => () => {
    setCourseCoordinateList((prev) =>
      prev.map((value, index) => (id === index ? { ...value, isFlag: !value.isFlag } : value))
    )
  }

  return (
    <Root className={className}>
      <InitialAddressSearchBarContainer>
        <StyledInput
          value={initialAddress}
          onChange={(e: any) => setInitialAddress(e.target.value)}
          placeholder={'초기 주소를 입력해주세요.'}
        />
        <StyledButton onClick={onClickSearchInitialAddress}>검색하기</StyledButton>
      </InitialAddressSearchBarContainer>
      <Map
        center={initialAddressCoordinate}
        style={{
          width: '100%',
          height: '450px',
        }}
        level={5}
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
            value.isFlag && (
              <MapMarker position={value} key={`flag_list_${index}`} clickable={true}>
                {/* <p>깃발 {index + 1}</p> */}
              </MapMarker>
            )
        )}
      </Map>
      <CourseEditorContainer>
        {courseCoordinateList.map((courseCoordinateItem, index) => (
          <CourseEditorWrapper
            key={`course_coordinate_item_${courseCoordinateItem.lat}_${courseCoordinateItem.lng}__${index}`}
          >
            <CourseEditorContentContainer>
              lat: {courseCoordinateItem.lat}, lng: {courseCoordinateItem.lng}
              <CourseEditorIsFlagContainer>
                <span>, isFlag : </span>{' '}
                <input
                  type={'checkbox'}
                  checked={courseCoordinateItem.isFlag}
                  onClick={onClickCheckboxCourseIsFlag(index)}
                />
              </CourseEditorIsFlagContainer>
            </CourseEditorContentContainer>
            <button onClick={onDeleteCourseCoordinateItem(index)}>삭제하기</button>
          </CourseEditorWrapper>
        ))}
      </CourseEditorContainer>
      <ResultContainer>{JSON.stringify(courseCoordinateList)}</ResultContainer>
    </Root>
  )
}
