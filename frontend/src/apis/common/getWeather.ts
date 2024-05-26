import axios from 'axios'

const apiKey = process.env['REACT_APP_PUBLIC_DATA_KEY'] // 공공데이터 포털에서 발급받은 API 키를 입력하세요

export async function getWeather(lat: number, lng: number) {
  const grid: any = convertToGrid(lat, lng)

  const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
  const params = {
    ServiceKey: apiKey,
    numOfRows: '100',
    pageNo: '1',
    dataType: 'JSON',
    base_date: getCurrentDate(),
    base_time: '1200', // 기본 시간 (예시)
    nx: grid.x.toString(),
    ny: grid.y.toString(),
  }

  try {
    const response = await axios.get(url, { params })
    const weatherData = response.data.response.body.items.item

    const weatherMap: any = {}
    weatherData.forEach((item: any) => {
      const { fcstDate, fcstTime, category, fcstValue } = item
      if (!weatherMap[fcstDate]) weatherMap[fcstDate] = {}
      if (!weatherMap[fcstDate][fcstTime]) weatherMap[fcstDate][fcstTime] = {}
      weatherMap[fcstDate][fcstTime][category] = fcstValue
    })

    for (const date in weatherMap) {
      for (const time in weatherMap[date]) {
        const data = weatherMap[date][time]
        // if (data.T1H) console.log(` - T1H: ${data.T1H}°C (1시간 기온)`)
        // if (data.TMP) console.log(` - TMP: ${data.TMP}°C (예보 기온)`)
        return data
      }
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

function convertToGrid(lat: number, lon: number) {
  const RE = 6371.00877 // 지구 반경(km)
  const GRID = 5.0 // 격자 간격(km)
  const SLAT1 = 30.0 // 투영 위도1(degree)
  const SLAT2 = 60.0 // 투영 위도2(degree)
  const OLON = 126.0 // 기준점 경도(degree)
  const OLAT = 38.0 // 기준점 위도(degree)
  const XO = 43 // 기준점 X좌표(GRID)
  const YO = 136 // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0
  const re = RE / GRID
  const slat1 = SLAT1 * DEGRAD
  const slat2 = SLAT2 * DEGRAD
  const olon = OLON * DEGRAD
  const olat = OLAT * DEGRAD

  const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  const ro = re / sf

  const rs: any = {}
  const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5)
  const theta = lon * DEGRAD - olon
  rs.x = Math.floor(ro + ra * Math.sin(theta) + XO + 0.5)
  rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)

  return rs
}

function getCurrentDate() {
  const date = new Date()
  let month = (date.getMonth() + 1).toString()
  let day = date.getDate().toString()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return date.getFullYear().toString() + month + day
}
