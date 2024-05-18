import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useEffect, useState } from 'react'
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
  isDetail?: boolean
  onSelect?: () => void
  isSimulating?: boolean
  stopSimulate?: () => void
  hideInfo?: boolean
}

let timer: any

export const PloggingCourseViewer: FC<PloggingCourseViewerProps> = ({
  className,
  courseItem,
  onSelect,
  isDetail = false,
  isSimulating = false,
  stopSimulate,
  hideInfo = false,
}) => {
  const [isPassedCount, setIsPassedCount] = useState<number>(0)
  const [loading, setLoading] = useState<'DONE' | 'LOADING'>('DONE')
  const { state: courseCoordinateFlagActivate, toggleState: toggleCourseCoordinateFlagActivate } =
    useBooleanState(false)

  const isPassedRunningCourseList = courseItem.coordinateList

  const onClickButtonIsPassedCount = () => {
    timer = setInterval(() => {
      setIsPassedCount((prev) => prev + 1)
    }, 100)
    setIsPassedCount(0)
    setLoading('LOADING')
  }

  useEffect(() => {
    if (isSimulating) {
      if (loading === 'DONE') {
        onClickButtonIsPassedCount()
      }
      if (loading === 'LOADING' && isPassedCount === isPassedRunningCourseList.length) {
        clearInterval(timer)
        setLoading('DONE')
        stopSimulate && stopSimulate()
      }
    }
  }, [isPassedCount, isSimulating, isPassedRunningCourseList.length, loading, stopSimulate])

  useEffect(() => {
    return () => clearInterval(timer)
  }, [])

  const washedIsPassedRunningCourseList = (() => {
    if (!isSimulating && isPassedCount === 0) {
      return []
    }
    return isPassedRunningCourseList.filter((_value, index) => index < isPassedCount)
  })()

  const isPassedLastCoordinate =
    washedIsPassedRunningCourseList.length > 0 &&
    washedIsPassedRunningCourseList[washedIsPassedRunningCourseList.length - 1]

  if (!courseItem) {
    return <div>올바르지 않은 접근입니다.</div>
  }

  const cameraInitialCoordinate = courseItem.coordinateList[0]
  const courseCoordinateList = courseItem.coordinateList
  const courseName = courseItem.name

  return (
    <Root className={className}>
      <KakaoMapContainer isDetail={isDetail}>
        <Map
          center={cameraInitialCoordinate}
          style={{
            width: '100%',
            height: isDetail ? '400px' : '250px',
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

          <Polyline
            path={washedIsPassedRunningCourseList}
            strokeWeight={5}
            strokeColor={'#4d7c0f'}
            strokeOpacity={1.0}
            strokeStyle={'solid'}
          />
          {isPassedLastCoordinate && (
            <MapMarker
              position={isPassedLastCoordinate}
              clickable={true}
              title="현재 위치"
              image={{ src: '/images/pin.svg', options: { offset: { x: 12, y: 20 } }, size: { width: 40, height: 40 } }}
            >
              {/* <StyledFont>현재 위치</StyledFont> */}
            </MapMarker>
          )}
        </Map>
        <KakaoMapMenuContainer>
          <KakaoMapMenuSwitch value={courseCoordinateFlagActivate} onClick={toggleCourseCoordinateFlagActivate} />
        </KakaoMapMenuContainer>
      </KakaoMapContainer>
      {courseName && !isDetail && !hideInfo && (
        <MenuContainer>
          <NameTypo>코스 이름: {courseName}</NameTypo>
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
