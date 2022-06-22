import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = join(__dirname, '../../public');
const partialsPath = join(__dirname, '../../templates/partials')

const WEATHER_API_URL = process.env.WEATHER_API_URL
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const GEOCODING_API_URL = process.env.GEOCODING_API_URL
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY
// console.log(GEOCODING_API_KEY);

export {
    __dirname,
    __filename,
    publicPath,
    partialsPath,
    WEATHER_API_URL,
    WEATHER_API_KEY,
    GEOCODING_API_URL,
    GEOCODING_API_KEY
};