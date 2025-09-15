import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup,Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './map-view.css'
const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const purpleOptions = { color: 'purple' }

function MapView() {
    const position = [51.505, -0.09]
    return (
        <div className='map__main'>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className='leaflet-custom'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

                <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
            </MapContainer>
        </div>
    )
}



export default MapView
