import React from 'react'

export default function EnvironmentalStats({ community }) {
  return (
    <div className="community-stats">
      <h2 className="section-title">Environmental Metrics</h2>
      <div className="stats-grid">
        {/* Rainfall Card */}
        <div className="stat-card rainfall-card">
          <div className="stat-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            <span className="stat-title">Annual Rainfall</span>
          </div>
          <div className="rainfall-graph">
            <div className="rainfall-bar-bg">
              <div 
                className="rainfall-bar-fill" 
                style={{ width: `${(community.rainfall / 800) * 100}%` }}
              >
                <span className="rainfall-value">{community.rainfall}mm</span>
              </div>
              <div 
                className="rainfall-average-marker" 
                style={{ left: `${(community.avgRainfall / 800) * 100}%` }}
              >
                <div className="marker-line"></div>
                <span className="marker-label">Avg: {community.avgRainfall}mm</span>
              </div>
            </div>
            <div className="rainfall-scale">
              <span>0mm</span>
              <span>800mm</span>
            </div>
          </div>
        </div>

        {/* Soil Type - Simple Info */}
        <div className="stat-card">
          <div className="stat-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="stat-title">Soil Type</span>
          </div>
          <div>
            <div className="stat-value-large">{community.soilType}</div>
            <span className="stat-sublabel">• Optimal for mixed crops</span>
          </div>
        </div>

        {/* Soil pH - Simple Info */}
        <div className="stat-card">
          <div className="stat-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/>
              <path d="M9 12h6"/>
            </svg>
            <span className="stat-title">Soil pH Level</span>
          </div>
          <div>
            <div className="stat-value-large">{community.soilpH}</div>
            <span className="stat-sublabel">• Slightly acidic</span>
          </div>
        </div>
      </div>
    </div>
  )
}
