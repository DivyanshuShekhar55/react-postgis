import { useState, useEffect } from 'react'
import './App.css'
import MapView from './MapView'
import DataInsertionComponent from './DataInsertionComponent'


function App() {

  return (
    <>

      <DataInsertionComponent />
      <MapView />
    </>
  )
}

export default App
