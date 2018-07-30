import axios from 'axios'

export default {
    fetchProperties,
    fetchCouncils
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// TODO: tests
async function fetchProperties() {
    const response = await instance.get('/properties')

    // convert geo cords to float for visual map
    const properties = response.data.map(property => {
        return {
            ...property,
            longitude: parseFloat(property.longitude),
            latitude: parseFloat(property.latitude)
        }
    })
    return properties    
}

async function fetchCouncils() {
    const response = await instance.get('/lgas')
    const councils = response.data
    return councils
}

