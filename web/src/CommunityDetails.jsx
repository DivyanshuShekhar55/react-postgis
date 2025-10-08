import React from 'react'
import { useParams } from 'react-router-dom'

export default function CommunityDetails() {
  const { id } = useParams()
  return (
    <div style={{ padding: 20 }}>
      <h2>Community Details</h2>
      <p>Hello — this is the mock community details page for community id: {id}</p>
    </div>
  )
}
