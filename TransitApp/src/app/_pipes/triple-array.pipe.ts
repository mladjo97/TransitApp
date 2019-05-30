import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'tripleArray'
})
@Injectable()
export class tripleArray implements PipeTransform {
    transform(items: Array<Array<Array<string>>>, args: any[]): any {
        return items.values;
    }
}