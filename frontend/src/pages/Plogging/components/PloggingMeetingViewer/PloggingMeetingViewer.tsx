import { MeetingCategoryChip } from 'components/MeetingCategoryChip'
import dayjs from 'dayjs'
import { useBooleanState } from 'hooks/useBooleanState'
import { FC, useEffect, useState } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { MeetingItemType } from 'types/meeting'
import { getMeetingCategoryLabel } from 'utils/getMeetingCategoryLabel'
import {
  KakaoMapContainer,
  KakaoMapMenuContainer,
  KakaoMapMenuSwitch,
  MapMarkerContentContainer,
  MapMarkerContentTypo,
  MeetingCategoryChipWrapper,
  MeetingInfoContainer,
  MenuContainer,
  NameTypo,
  Root,
  SelectButton,
  SelectButtonTypo,
} from './styled'

type PloggingMeetingViewerProps = {
  className?: string
  meetingItem: MeetingItemType
  isDetail?: boolean
  onSelect?: () => void
  onStart?: () => void
  isSimulating?: boolean
  stopSimulate?: () => void
  type?: 'LIST' | 'SCHEDULED'
}

let timer: any

export const PloggingMeetingViewer: FC<PloggingMeetingViewerProps> = ({
  className,
  meetingItem,
  onSelect,
  onStart,
  isDetail = false,
  isSimulating = false,
  stopSimulate,
  type = 'LIST',
}) => {
  const [isPassedCount, setIsPassedCount] = useState<number>(0)
  const [loading, setLoading] = useState<'DONE' | 'LOADING'>('DONE')
  const { state: courseCoordinateFlagActivate, toggleState: toggleCourseCoordinateFlagActivate } =
    useBooleanState(false)

  const isPassedRunningCourseList = meetingItem.courseItem.coordinateList

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

  if (!meetingItem) {
    return <div>올바르지 않은 접근입니다.</div>
  }

  const cameraInitialCoordinate = meetingItem.courseItem.coordinateList[0]
  const courseCoordinateList = meetingItem.courseItem.coordinateList
  const meetingName = meetingItem.name
  const maxCount = meetingItem.maxCount
  const meetingCategory = getMeetingCategoryLabel(meetingItem.category)

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
      <MeetingCategoryChipWrapper>
        <MeetingCategoryChip category={meetingItem.category} />
      </MeetingCategoryChipWrapper>
      {meetingName && !isDetail && (
        <MenuContainer>
          <NameTypo>
            모임 이름: {meetingName} <br />
            {(type === 'SCHEDULED' || type === 'LIST') && (
              <MeetingInfoContainer>
                <NameTypo>{`인원: ${maxCount - 1}명/${maxCount}명 · 일시: ${dayjs(meetingItem.startAt).format(
                  `YY.MM.DD A hh:mm`
                )}`}</NameTypo>
              </MeetingInfoContainer>
            )}
          </NameTypo>
          {onSelect && (
            <SelectButton type={'primary'} onClick={onSelect}>
              <SelectButtonTypo>모임 선택</SelectButtonTypo>
            </SelectButton>
          )}
          {onStart && (
            <SelectButton type={'primary'} onClick={onStart}>
              <SelectButtonTypo>모임 시작</SelectButtonTypo>
            </SelectButton>
          )}
        </MenuContainer>
      )}
    </Root>
  )
}
