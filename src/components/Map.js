import React from 'react'
import ReactMapboxGl from "react-mapbox-gl";

const MapBox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const styles = {
    "light": "mapbox://styles/mapbox/light-v9",
    "dark": "mapbox://styles/mapbox/dark-v9",
}

function Map({ children, center }) {
    return <MapBox
        center={center}
        zoom={[9]}
        containerStyle={{
            height: "100%",
            width: "100%",
        }}
        style={styles.light}
    >
    {children}
    </MapBox>
}

export default Map