import React from 'react'
import './DataInsertionComponent.css'

function DataInsertionComponent() {
    const [coords, setCoords] = React.useState(new Array(5).fill([null, null]))

    function onChange(ind, value, type) {
        setCoords(prev => [prev[ind][type === "lang" ? 0 : 1]] = value, ...prev)
    }

    return (
        <div className='dataInsertion__main'>
            <h2>Enter Polygon</h2>

            {new Array(5).fill(0).map((_, i) => (

                <div className="dataInsertion__coordContainer">
                    <div className="dataInsertion__inputLang">
                        <input type="number" placeholder='Longitude' 
                        onChange={e => {
                            onChange(i, e.target.value, "lang")
                            e.preventDefault()
                        }}
                        />
                    </div>

                    <div className="dataInsertion__inputLat">
                        <input type="number" placeholder='Latitude'
                        onChange={e => {
                            onChange(i, e.target.value, "lat")
                            e.preventDefault()
                        }} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DataInsertionComponent
