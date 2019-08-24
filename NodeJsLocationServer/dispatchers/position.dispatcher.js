import { getBusLines } from '../clients/transitApi.client';
import { getRoutes } from '../clients/openRoute.client';
import localContainer from '../containers/local.container';

const positionDispatcher = {
    numOfBuses: 3,
    busIndexes: [],

    async doWork() {
        this.loadBusLines();
        this.loadBusLineRoutes();
    },

    async loadBusLines() {
        try {
            const busLines = await getBusLines();
            localContainer.busLines = busLines;

            localContainer.organizeBusLineStations();
            this.loadBusLineRoutes();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async loadBusLineRoutes() {
        try {
            localContainer.busLineStations.forEach(async busLineStation => {
                const route = [];
                for (let i = 0; i < busLineStation.stations.length - 1; i++) {
                    const apiPositions = await getRoutes(busLineStation.stations[i].station.lon,
                        busLineStation.stations[i].station.lat,
                        busLineStation.stations[i + 1].station.lon,
                        busLineStation.stations[i + 1].station.lat);

                    route.push(...apiPositions);
                }
                localContainer.setBusLineRoutes(busLineStation.id, route);
                console.log('Successfully loaded busline routes');
            });

            return true;
        } catch (error) {
            console.log('ERROR: ' + error);
            return false;
        }
    }

};

export default positionDispatcher;