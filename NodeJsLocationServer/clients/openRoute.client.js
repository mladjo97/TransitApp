import axios from 'axios';
import config from '../config';

export const getRoutes = async (startLon, startLat, endLon, endLat) => {
    const start = `${startLon},${startLat}`;
    const end = `${endLon},${endLat}`;
    const url = `${config.openRouteApi}&start=${start}&end=${end}`;

    try {
        const req = await axios.get(url);
        const coordinates = req.data.features[0].geometry.coordinates;
        const positions = coordinates.map(coo => {
            return {
                lon: coo[0],
                lat: coo[1]
            }
        });

        return positions;
    } catch (err) {
        console.log(err);
    }
};