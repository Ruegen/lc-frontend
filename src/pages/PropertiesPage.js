import React, {Component, Fragment} from 'react'
import api from '../api/init'
import Map from '../components/Map'
import Info from '../components/Info'
import NavBar from '../components/NavBar'
import Filter from '../components/Filter'
import { Layer, Feature } from "react-mapbox-gl";

import './PropertiesPage.css'

function getCordsOfFirstProperty(properties) {
    const [property] = properties
    return [
        property.longitude,
        property.latitude
    ]
}

export default class PropertiesPage extends Component {
    
    state = {
        properties: null,
        pageError: null,
        centerCoordinates: null,
        currentProperty: null,
        councils: null,
        filteredProperties: null
    }

    selectProperty = (id) => {

        const property = this.state.properties.find(property => property.id === id)
         
        if(property) {
            this.setState({
                currentProperty: property
            })
        }
    }

 

    filterProperties = (id) => {

        if(!id) {
            this.setState((prevState) => {
                const properties = prevState.properties
                const cords = getCordsOfFirstProperty(properties)
                return {
                    filteredProperties: properties,
                    centerCoordinates: cords
                }
            })
            return;
        }

        const filteredProperties = this.state.properties.filter(property => {
            return property.local_government_area.id === id
        })

        const cords = getCordsOfFirstProperty(filteredProperties)

        this.setState({
            filteredProperties,
            centerCoordinates: cords
        })
    }

    componentDidMount() {

        Promise.all([
            api.fetchCouncils(),
            api.fetchProperties()
        ])
        .then(([councils, properties]) => {

            const cords = getCordsOfFirstProperty(properties)
            
            this.setState({
                properties,
                centerCoordinates: cords,
                filteredProperties: properties,
                councils
            })
        })
        .catch(err => {
            this.setState({
                pageError: err.message
            })
        })
    }

    render() {
        const {
            properties,
            centerCoordinates,
            currentProperty,
            councils,
            filteredProperties
        } = this.state


        if(!properties) {
            return <div>Loading...</div>
        }

        return <Fragment>
        <header>
            <NavBar title="Properties"/>
        </header>
        <main>
            <Map center={centerCoordinates}>
                <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>

                {
                    filteredProperties.map(property => {
                        const {longitude, latitude} = property
                        const cords = [longitude, latitude]
                        
                        return <Feature 
                            key={property.id} 
                            onClick={() => this.selectProperty(property.id)} 
                            coordinates={cords} 
                        />
                    })
                }

                </Layer>
            </Map>
            <Filter handleChange={this.filterProperties} councils={councils} />
            <Info property={currentProperty}/>
        </main>

        </Fragment>
    }
}