import { getBusLines } from '../clients/transitApi.client';
import { getRoutes } from '../clients/openRoute.client';
import localContainer from '../containers/local.container';

const positionDispatcher = {
    localContainer: localContainer,
    numOfBuses: 3,
    busIndexes: [],

    async doWork() {
        await this.loadBusLines();
        await this.loadBusLineRoutes();
        this.initBusIndexes();
    },

    async loadBusLines() {
        try {
            const busLines = await getBusLines();
            this.localContainer.busLines = busLines;

            this.localContainer.organizeBusLineStations();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async loadBusLineRoutes() {
        try {
            for (let i = 0; i < this.localContainer.busLineStations.length; i++) {
                const busLineStation = this.localContainer.busLineStations[i];
                const route = [];

                for (let j = 0; j < busLineStation.stations.length - 1; j++) {
                    const apiPositions = await getRoutes(busLineStation.stations[j].station.lon,
                        busLineStation.stations[j].station.lat,
                        busLineStation.stations[j + 1].station.lon,
                        busLineStation.stations[j + 1].station.lat);

                    route.push(...apiPositions);
                }
                this.localContainer.setBusLineRoutes(busLineStation.id, route);
            }

            console.log('Successfully loaded busline routes');
            return true;
        } catch (error) {
            console.log('ERROR: ' + error);
            return false;
        }
    },

    async initBusIndexes() {
        for(let i = 0; i < this.localContainer.busLineRoutes.length; i++) {
            const numOfPositions = Math.floor(this.localContainer.busLineRoutes[i].routes.length / this.numOfBuses);

            const indexes = [];
            let index = 0;

            for(let j = 0; j < this.numOfBuses; j++) {
                indexes.push(index);
                index = index + numOfPositions;
            }

            this.busIndexes.push({ 
                id: this.localContainer.busLineRoutes[i].id,
                indexes: indexes 
             });

             console.log(this.busIndexes);
        }
    }


};

export default positionDispatcher;