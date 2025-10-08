import React from 'react'

export default function SchemesTable({ schemes }) {
  return (
    <div className="community-schemes">
      <h2 className="section-title">Recommended Government Schemes</h2>
      <div className="schemes-table">
        <div className="schemes-header">
          <div className="scheme-col scheme-col-code">Code</div>
          <div className="scheme-col scheme-col-name">Scheme Name</div>
          <div className="scheme-col scheme-col-budget">Budget</div>
          <div className="scheme-col scheme-col-priority">Priority</div>
          <div className="scheme-col scheme-col-link">Link</div>
        </div>
        {schemes.map(scheme => (
          <div key={scheme.id} className="scheme-row">
            <div className="scheme-col scheme-col-code">
              <span className="scheme-code">{scheme.code}</span>
            </div>
            <div className="scheme-col scheme-col-name">
              <span className="scheme-name-text">{scheme.name}</span>
            </div>
            <div className="scheme-col scheme-col-budget">
              <span className="scheme-budget-text">{scheme.budget}</span>
            </div>
            <div className="scheme-col scheme-col-priority">
              <span className={`priority-badge priority-${scheme.priority.toLowerCase()}`}>
                {scheme.priority}
              </span>
            </div>
            <div className="scheme-col scheme-col-link">
              {scheme.link !== '-' ? (
                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="scheme-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  View
                </a>
              ) : (
                <span className="scheme-link-na">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
