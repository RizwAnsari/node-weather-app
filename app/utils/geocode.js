import request from "postman-request";
// import {GEOCODING_API_URL, GEOCODING_API_KEY} from "./constants.js"
import dotenv from 'dotenv';

dotenv.config();

const GEOCODING_API_URL = process.env.GEOCODING_API_URL
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY

const geocode = (address, callback) => {
    const url = `${GEOCODING_API_URL}mapbox.places/${address}.json?access_token=${GEOCODING_API_KEY}&limit=1`
    request({ url, json: true }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

export default geocode;