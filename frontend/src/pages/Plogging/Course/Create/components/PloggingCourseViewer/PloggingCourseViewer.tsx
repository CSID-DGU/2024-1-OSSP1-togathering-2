import { useBooleanState } from 'hooks/useBooleanState'
import { FC } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { CourseItemType } from 'types/plogging'
import {
  KakaoMapContainer,
  KakaoMapMenuContainer,
  KakaoMapMenuSwitch,
  MapMarkerContentContainer,
  MapMarkerContentTypo,
  MenuContainer,
  NameTypo,
  Root,
  SelectButton,
  SelectButtonTypo,
} from './styled'

type PloggingCourseViewerProps = {
  className?: string
  courseItem: CourseItemType
  onSelect?: () => void
}

export const PloggingCourseViewer: FC<PloggingCourseViewerProps> = ({ className, courseItem, onSelect }) => {
  const { state: courseCoordinateFlagActivate, toggleState: toggleCourseCoordinateFlagActivate } =
    useBooleanState(false)

  if (!courseItem) {
    return <div>올바르지 않은 접근입니다.</div>
  }

  const cameraInitialCoordinate = courseItem.coordinateList[0]
  const courseCoordinateList = courseItem.coordinateList
  const courseName = courseItem.name

  return (
    <Root className={className}>
      <KakaoMapContainer>
        <Map
          center={cameraInitialCoordinate}
          style={{
            width: '100%',
            height: '250px',
          }}
          level={4}
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
              (index === 0 || index === courseCoordinateList.length - 1 || courseCoordinateFlagActivate) && (
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
      {courseName && (
        <MenuContainer>
          <NameTypo>코스 명 : {courseName}</NameTypo>
          {onSelect && (
            <SelectButton type={'primary'} onClick={onSelect}>
              <SelectButtonTypo>코스 선택</SelectButtonTypo>
            </SelectButton>
          )}
        </MenuContainer>
      )}
    </Root>
  )
}
