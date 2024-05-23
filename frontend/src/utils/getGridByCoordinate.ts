export const getGridByCoordinate = (v1: number, v2: number): string => {
  const RE = 6371.00877 // Earth radius (km)
  const GRID = 5.0 // Grid interval (km)
  const SLAT1 = 30.0 // Projection latitude1 (degree)
  const SLAT2 = 60.0 // Projection latitude2 (degree)
  const OLON = 126.0 // Reference point longitude (degree)
  const OLAT = 38.0 // Reference point latitude (degree)
  const XO = 43 // Reference point X coordinate (GRID)
  const YO = 136 // Reference point Y coordinate (GRID)

  const DEGRAD = Math.PI / 180.0
  const RADDEG = 180.0 / Math.PI

  const re = RE / GRID
  const slat1 = SLAT1 * DEGRAD
  const slat2 = SLAT2 * DEGRAD
  const olon = OLON * DEGRAD
  const olat = OLAT * DEGRAD

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
  ro = (re * sf) / Math.pow(ro, sn)

  let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5)
  ra = (re * sf) / Math.pow(ra, sn)

  let theta = v2 * DEGRAD - olon
  if (theta > Math.PI) {
    theta -= 2.0 * Math.PI
  }
  if (theta < -Math.PI) {
    theta += 2.0 * Math.PI
  }
  theta *= sn

  const x = Math.floor(ra * Math.sin(theta) + XO + 0.5)
  const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)

  const url = `http://www.kma.go.kr/wid/queryDFS.jsp?gridx=${x}&gridy=${y}`
  return url
}
