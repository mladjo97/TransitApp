import axios from 'axios';
import config from '../config';

export const getBusLines = async () => {
    const req = await axios.get(`${config.transitWebApi}/buslines`);
    return req.data;
};