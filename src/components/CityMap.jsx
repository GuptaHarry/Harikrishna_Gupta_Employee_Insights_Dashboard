import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

const cityCoordinates = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  "San Francisco": [37.7749, -122.4194],
  "New York": [40.7128, -74.0060],
  London: [51.5072, -0.1276],
  Singapore: [1.3521, 103.8198],
  Sidney: [-33.8688, 151.2093]  // Misspelled value of Sydney only shows the marker.
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25,41],
  iconAnchor: [12,41]
})

export default function CityMap({employees}){

  const cityGroups = {}

  employees.forEach(emp=>{
    const city = emp[2]

    if(!cityGroups[city]){
      cityGroups[city] = []
    }

    cityGroups[city].push(emp)
  })

  const cities = Object.keys(cityGroups)

  return(

    <MapContainer
      center={[20,0]}
      zoom={2}
      style={{
        height:"340px",
        width:"100%",
        borderRadius:"10px",
        border:"1px solid #e5e7eb"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cities.map(city=>{

        const coords = cityCoordinates[city]

        if(!coords) return null

        const cityEmployees = cityGroups[city]

        return(

          <Marker
            key={city}
            position={coords}
            icon={markerIcon}
          >

            <Popup>

              <strong>📍 {city}</strong>

              <br/>

              Employees: {cityEmployees.length}

              <br/><br/>

              {
                cityEmployees.length > 5 ? (
              cityEmployees
                .slice(0,5)
                .map(emp=>emp[0])
                .join(", ")
                ) + "....": (
                    cityEmployees
                .slice(0,5)
                .map(emp=>emp[0])
                .join(", ")
                )  
              }
              
            </Popup>

          </Marker>

        )

      })}

    </MapContainer>

  )
}
