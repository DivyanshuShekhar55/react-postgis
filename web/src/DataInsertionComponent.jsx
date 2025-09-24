import React from 'react'
import './DataInsertionComponent.css'

function DataInsertionComponent() {
    const [coords, setCoords] = React.useState(new Array(5).fill([null, null]))
    const [name, setName] = React.useState('')

    function onChange(ind, value, type) {
        setCoords(prev => {
            const updated = prev.map((coord, i) => {
                if (i !== ind) return coord;
                const newCoord = [...coord];
                newCoord[type === "lang" ? 0 : 1] = parseFloat(value);
                return newCoord;
            });
            return updated;
        });
    }

    function onSubmit() {
        fetch('http://localhost:6969/location', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                poly_points: coords
            })
        })
        console.log(coords)
    }

    return (
        <div className='dataInsertion__main'>
            <h2>Enter Polygon</h2>
            <div className="dataInsertion__nameBox">
                <h3>Enter Label</h3>
                <input type="text" placeholder='Label' onChange={e => setName(e.target.value)} value={name}/>
            </div>

            {new Array(5).fill(0).map((_, i) => (

                <div className="dataInsertion__coordContainer" key={i}>
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

            <button className='dataInsertion__submitBtn' onClick={onSubmit}>
                Submit
            </button>
        </div>
    )
}

export default DataInsertionComponent
