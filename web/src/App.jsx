import { useState, useEffect } from 'react'
import './App.css'
import MapView from './MapView'


function App() {
  const [poly, setPoly] = useState([])

  useEffect(() => {
    const polys = fetch('http://localhost:6969/location')
      .then(res => res.json())
      .then(data => data.map(shape => {
        const {geom, id, name} = shape
        const coords = geom.coordinates[0]
        // coords array of array hai
        // jaise ki [ [2.005, 3.455], [6.77, 8.99] ]
       
        // curently stores lang, lat in backend
        // but leaflet js expects lat, lang pair
        // isliye reverse the order
        const reversedCoords = coords.map(([lng, lat]) => [lat, lng])

        setPoly(prev => [...prev, reversedCoords])
      }))
  }, [])

  

  return (
    <MapView polys={poly}/>
  )
}

export default App
