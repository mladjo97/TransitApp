import { StartTime } from './start-time.model';
import { Station } from './station.model';

export class BusLine {
    id: number;
    name: string;
    description: string;
    busLineTypeId: number;
    timetable: StartTime[];
    stations: Station[];
    rowVersion: any;

    constructor(id: number, name: string, desc: string, blt: number, timetable: StartTime[], stations: Station[]) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.busLineTypeId = blt;
        this.timetable = timetable;
        this.stations = stations;
    }
}