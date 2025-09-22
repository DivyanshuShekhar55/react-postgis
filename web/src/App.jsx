import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapView from './MapView'


function App() {
  const [poly, setPoly] = useState()

  useEffect(() => {
    const polys = fetch('http://localhost:6969/location')
      .then(res => res.json())
      .then(data => setPoly(data))
  }, [])

  console.log(poly)

  return (
    <MapView />
  )
}

export default App
