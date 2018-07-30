import React from 'react'
import './Filter.css'

function Filter({
    councils,
    handleChange
}) {
    return <div className="filter-box">
        <h4>FILTER</h4>
        <select onChange={(e) => {
            const id = parseInt(e.target.value, 10) 
            handleChange(id)
        }}>
        <option value>FILTER BY COUNCIL</option>
        {councils.map(council => {
            return <option key={council.id} value={council.id}>{council.name}</option>
        })}
        </select>
    </div>
}

export default Filter