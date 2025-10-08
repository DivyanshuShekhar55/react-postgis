import React from 'react'

export default function CommunityInfo({ community }) {
  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'individual': return '#3b82f6'
      case 'government': return '#10b981'
      case 'community': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  return (
    <div className="community-info">
      <div className="community-info-header">
        <div>
          <h1 className="community-name">{community.name}</h1>
          <p className="community-location">📍 {community.state}</p>
        </div>
        <span 
          className="community-type-badge" 
          style={{ backgroundColor: `${getTypeColor(community.type)}15`, color: getTypeColor(community.type) }}
        >
          {community.type}
        </span>
      </div>
    </div>
  )
}
