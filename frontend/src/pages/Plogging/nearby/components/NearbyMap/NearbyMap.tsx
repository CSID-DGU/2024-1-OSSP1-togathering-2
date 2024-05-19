import { FC } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import { CoordinateItemType } from 'types/plogging'

type NearbyMapProps = {
  className?: string
  center: CoordinateItemType | null
  startingPoints: CoordinateItemType[]
}

export const NearbyMap: FC<NearbyMapProps> = ({ className, center, startingPoints }) => {
  return (
    <Root className={className}>
      <Map
        center={center ?? startingPoints[0]}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={5}
      >
        {startingPoints.map((value, index) => (
          <MapMarker position={value} key={`flag_list_${index}`} clickable={true}>
            {/* <p>깃발 {index + 1}</p> */}
          </MapMarker>
        ))}
      </Map>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
`
