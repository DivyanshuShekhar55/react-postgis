import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import './map-view.css';

const purpleOptions = { color: '#7303c0', fillOpacity: 0.2 };

function MapView() {
  const navigate = useNavigate()
  const [poly, setPoly] = useState([])
  const [mapData, setMapData] = useState([])
  // map data iss tarah ka hai :
  // [ {id:1, name: "", center: [lat, long],  coords : [[lat1, long1], [lat2, long2]]}, {...} ]

  useEffect(() => {
    const polys = fetch('http://localhost:6969/location')
      .then(res => res.json())
      .then(data => data.map(shape => {
        const { geom, id, name, center } = shape
        const coords = geom.coordinates[0]
        // coords array of array hai
        // jaise ki [ [2.005, 3.455], [6.77, 8.99] ]

        // curently stores lang, lat in backend
        // but leaflet js expects lat, lang pair
        // isliye reverse the order
        const reversedCoords = coords.map(([lng, lat]) => [lat, lng])

        const reversedCenterCoords = [center.coordinates[1], center.coordinates[0]]
        console.log(reversedCenterCoords)

        setPoly(prev => [...prev, reversedCoords])
        setMapData(prev => [...prev, { name, id, coords: reversedCoords, center:reversedCenterCoords }])
      }))
  }, [])
  const position = [51.505, -0.09];

  return (
    <div className='map__main'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className='leaflet-custom'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {mapData.map((item, idx) => (
          <Polygon key={idx} pathOptions={purpleOptions} positions={item.coords} >
            <Marker position={item.center} eventHandlers={{
              click: ()=> {
                console.log("marker at ", item.center)
              }
            }}>
              <Popup>
                <div>
                  <div style={{ fontWeight: 700 }}>{item.name}</div>
                  <div style={{ marginTop: 6 }}>
                    <button onClick={() => navigate(`/community/${item.id}`)}>
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
