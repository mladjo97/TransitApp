import { StartTime } from './start-time.model';

export class BusLine {
    id: number;
    name: string;
    description: string;
    busLineTypeId: number;
    timetable: StartTime[];

    constructor(id: number, name: string, desc: string, blt: number, timetable: StartTime[]) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.busLineTypeId = blt;
        this.timetable = timetable;
    }
}