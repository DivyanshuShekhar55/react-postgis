import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function CommunityHeader({ community }) {
  const navigate = useNavigate()

  return (
    <div className="community-header">
      <button className="community-back" onClick={() => navigate('/')}>
        ← Back to Map
      </button>
      <div className="community-map">
        <MapContainer 
          center={community.center} 
          zoom={14} 
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
          className="community-map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon 
            pathOptions={{ color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.4 }} 
            positions={community.coords} 
          />
        </MapContainer>
      </div>
    </div>
  )
}
