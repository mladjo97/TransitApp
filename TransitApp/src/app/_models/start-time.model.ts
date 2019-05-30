import { Moment } from 'moment';

export class StartTime {
    time: Moment;
    dayOfWeek: number;
    day: string;

    constructor(time: Moment, dayIndex?: number, dayName?: string) {
        this.time = time;
        this.dayOfWeek = dayIndex;
        this.day = dayName;
    }
}