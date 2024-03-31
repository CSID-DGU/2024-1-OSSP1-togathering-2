import axios from 'axios'
import { TMAP_HEADERS } from './common'

type RequestType = {
  start: { lat: number; lng: number }
  end: { lat: number; lng: number }
}

// type ResultType = {
//   data: {
//     address_name: string
//     id: string
//     place_name: string
//     place_url: string
//     road_address_name: string
//     x: string
//     y: string
//   }[]
// }

export const tmapRoutePedestrian = async (data: RequestType) => {
  const requestUrl = 'https://apis.openapi.sk.com/tmap/routes/pedestrian'
  const requestData = {
    startX: data.start.lng,
    startY: data.start.lat,
    endX: data.end.lng,
    endY: data.end.lat,
    startName: '출발지',
    endName: '도착지',
  }
  return await axios.post(requestUrl, requestData, { headers: TMAP_HEADERS }).then((response) => {
    const resultData = response.data.features as any
    // const responseData = resultData.data.map((item) => ({
    //   lng: +item.x,
    //   lat: +item.y,
    //   name: `${item.place_name}(${item.address_name}`,
    // }))
    let responseData: any = []

    resultData.forEach((value: any) => {
      if (value.geometry.type === 'Point') {
        responseData = [
          ...responseData,
          { lng: value.geometry.coordinates[0], lat: value.geometry.coordinates[1], isFlag: true, isPassed: true },
        ]
      }
      if (value.geometry.type === 'LineString') {
        value.geometry.coordinates.forEach((value2: any) => {
          responseData = [...responseData, { lng: value2[0], lat: value2[1], isFlag: true, isPassed: true }]
        })
      }
    })

    return responseData
  })
}
