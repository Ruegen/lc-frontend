import React from 'react'
import './Info.css'

function Info({ property }) {

    if(!property) {
        return <div className="info-box">Select a property</div>
    }
    return <div className="info-box">

    <div className="column-section">
    <h3>PROPERTY DETAILS</h3>
    <h4>PROPERTY ADDRESS</h4>
    <p>
        {property.address.full_address}
    </p>

    <h4>COUNCIL</h4>
    <p>
        {property.local_government_area.long_name}
    </p>
    
    <h4>POSTCODE</h4>
    <p>
        {property.address.postcode}
    </p>
    </div>    
    </div>
}

export default Info