import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './CommunityDetails.css'
import CommunityHeader from './components/CommunityHeader'
import CommunityInfo from './components/CommunityInfo'
import EnvironmentalStats from './components/EnvironmentalStats'
import SchemesTable from './components/SchemesTable'

export default function CommunityDetails() {
  const { id } = useParams()
  const [community, setCommunity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch community details from backend
    fetch(`http://localhost:6969/location`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === parseInt(id))
        if (found) {
          const coords = found.geom.coordinates[0].map(([lng, lat]) => [lat, lng])
          const center = [found.center.coordinates[1], found.center.coordinates[0]]
          setCommunity({
            id: found.id,
            name: found.name,
            coords,
            center,
            // Mock data - replace with actual backend data
            state: 'Montana',
            type: 'Community',
            rainfall: 450,
            avgRainfall: 520,
            soilType: 'Loamy',
            soilpH: '6.5',
            schemes: [
              { id: 1, name: 'Pradhan Mantri Gram Sadak Yojana', code: 'PMGSY-2024', budget: '₹50,00,000', priority: 'High', link: 'https://omms.nic.in/' },
              { id: 2, name: 'National Rural Livelihood Mission', code: 'NRLM-2024', budget: '₹75,00,000', priority: 'High', link: 'https://nrlm.gov.in/' },
              { id: 3, name: 'Swachh Bharat Mission', code: 'SBM-2024', budget: '₹30,00,000', priority: 'Medium', link: 'https://swachhbharatmission.gov.in/' },
              { id: 4, name: 'Soil Health Card Scheme', code: 'SHCS-2024', budget: '₹15,00,000', priority: 'Low', link: '-' },
            ]
          })
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="community-loading">Loading community details...</div>
  }

  if (!community) {
    return <div className="community-loading">Community not found</div>
  }

  return (
    <div className="community-details">
      <CommunityHeader community={community} />
      <CommunityInfo community={community} />
      <EnvironmentalStats community={community} />
      <SchemesTable schemes={community.schemes} />
    </div>
  )
}
