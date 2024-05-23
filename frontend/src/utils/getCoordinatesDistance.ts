type CoordinateItemType = {
  lat: number
  lng: number
}

export const getCoordinatesDistance = (start: CoordinateItemType, destination: CoordinateItemType) => {
  let distance = Math.sqrt((start.lat - destination.lat) ** 2 + (start.lng - destination.lng) ** 2)

  return distance
}

export const getCoordinatesDistanceFromMe = (destination: CoordinateItemType) => {
  let isError = false
  let myCoordinate = { lat: 0, lng: 0 }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        myCoordinate = { lng: position.coords.longitude, lat: position.coords.latitude }
      },
      (error) => {
        isError = true
      }
    )
  }

  let distance = getCoordinatesDistance(myCoordinate, destination)
  if (isError) {
    return -1
  }
  return distance
}
