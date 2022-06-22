import request from "postman-request";
// import {WEATHER_API_URL, WEATHER_API_KEY} from "./constants.js";
import dotenv from 'dotenv';

dotenv.config();

const WEATHER_API_URL = process.env.WEATHER_API_URL
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

const weatherStack = (latitude, longitude, callback) => {
    const url = `${WEATHER_API_URL}current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}`
    request({ url, json: true }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error !== undefined) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                temperature: body.current.temperature + '°C',
                weather_descriptions: body.current.weather_descriptions[0],
                weather_icons: body.current.weather_icons[0],
                wind_speed: body.current.wind_speed + 'km/hr',
                pressure: body.current.pressure + 'mb',
                feelslike: body.current.feelslike + '°C'
            }
            callback(undefined, data)
        }
    })
}

export default weatherStack;