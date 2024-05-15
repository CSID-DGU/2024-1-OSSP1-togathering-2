import { useBooleanState } from 'hooks/useBooleanState'
import { FC } from 'react'
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import { MeetingItemType } from 'types/meeting'
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

type PloggingMeetingViewerProps = {
  className?: string
  meetingItem: MeetingItemType
  isDetail?: boolean
  onSelect?: () => void
}

export const PloggingMeetingViewer: FC<PloggingMeetingViewerProps> = ({
  className,
  meetingItem,
  onSelect,
  isDetail = false,
}) => {
  const { state: courseCoordinateFlagActivate, toggleState: toggleCourseCoordinateFlagActivate } =
    useBooleanState(false)

  if (!meetingItem) {
    return <div>올바르지 않은 접근입니다.</div>
  }

  const cameraInitialCoordinate = meetingItem.courseItem.coordinateList[0]
  const courseCoordinateList = meetingItem.courseItem.coordinateList
  const meetingName = meetingItem.name
  const maxCount = meetingItem.maxCount

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
      {meetingName && !isDetail && (
        <MenuContainer>
          <NameTypo>
            모임 이름 : {meetingName} <br /> 최대 인원: {maxCount}명
          </NameTypo>
          {onSelect && (
            <SelectButton type={'primary'} onClick={onSelect}>
              <SelectButtonTypo>모임 선택</SelectButtonTypo>
            </SelectButton>
          )}
        </MenuContainer>
      )}
    </Root>
  )
}
