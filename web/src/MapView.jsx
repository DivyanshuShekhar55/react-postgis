import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map-view.css';

const purpleOptions = { color: 'purple' };

function MapView() {
  const [poly, setPoly] = useState([])
  const [mapData, setMapData] = useState([])
  // map data iss tarah ka hai :
  // [ {id:1, name: "", coords : [[lat1, long1], [lat2, long2]]}, {...} ]

  useEffect(() => {
    const polys = fetch('http://localhost:6969/location')
      .then(res => res.json())
      .then(data => data.map(shape => {
        const { geom, id, name } = shape
        const coords = geom.coordinates[0]
        // coords array of array hai
        // jaise ki [ [2.005, 3.455], [6.77, 8.99] ]

        // curently stores lang, lat in backend
        // but leaflet js expects lat, lang pair
        // isliye reverse the order
        const reversedCoords = coords.map(([lng, lat]) => [lat, lng])

        setPoly(prev => [...prev, reversedCoords])
        setMapData(prev => [...prev, { name, id, coords: reversedCoords }])
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
            <Marker position={item.coords[0]}>
              <Popup>
                <b>{item.id}</b> <br/>{item.name}
              </Popup>
            </Marker>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
