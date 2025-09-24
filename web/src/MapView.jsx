import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map-view.css';

const purpleOptions = { color: 'purple' };

function MapView({ polys }) {
  const position = [51.505, -0.09]; 

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

        {polys.map((coords, idx) => (
          <Polygon key={idx} pathOptions={purpleOptions} positions={coords} />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
