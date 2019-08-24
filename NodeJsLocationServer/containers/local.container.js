const localContainer = {
    busLines: [],
    busLineStations: [],
    busLineRoutes: [],

    setBusLineStations(busLineId, busLineStations) {
        if(!this.busLineStations.find(bls => bls.id === busLineId)) {
            this.busLineStations.push({
                id: busLineId,
                stations: busLineStations
            });
        }
    },

    setBusLineRoutes(busLineId, routes) {
        if(!this.busLineRoutes.find(bls => bls.id === busLineId)) {
            console.log('Adding route for busline: ' + busLineId);
            this.busLineRoutes.push({
                id: busLineId,
                routes: routes
            });
        }
    },

    organizeBusLineStations() {
        this.busLines.forEach(busLine => {
            this.setBusLineStations(busLine._id, busLine.busLineStations);
        });
        console.log('Mapped buslines to their stations.');
    }
};

export default localContainer;