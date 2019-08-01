import Station from '@models/station';

import stationsJSON from './stations.json';

const seedStations = async () => {
    /*
     *  Insert stations 
    */
   stationsJSON.map(station => {
        const seedStation = {
            name: station.name,
            address: station.address,
            lon: station.lon,
            lat: station.lat
        };

        Station.create(seedStation, (err) => {
            if (err) return;
        });
    });
};

export default seedStations;