import { FC } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import { CoordinateItemType } from 'types/plogging'

type NearbyMapProps = {
  className?: string
  center: CoordinateItemType | null
  startingPoints: CoordinateItemType[]
  size?: 'sm' | 'md'
}

type SizeType = 'sm' | 'md'

export const NearbyMap: FC<NearbyMapProps> = ({ className, center, startingPoints, size = 'md' }) => {
  return (
    <Root className={className} size={size}>
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

const Root = styled.div<{ size: SizeType }>`
  width: 100%;
  height: ${(props) => (props.size === 'sm' ? 250 : 400)}px;
  display: flex;
  flex-direction: column;
`
