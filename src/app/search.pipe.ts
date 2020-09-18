import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'customerEmailFilter'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            let rVal = (val.name.toLowerCase().includes(args)) ||
                (val.email.toLowerCase().includes(args)) || (val.name.toUpperCase().includes(args))
                || (val.email.toUpperCase().includes(args)) || (val.name.toString().includes(args)) ||
                (val.email.toString().includes(args));
            return rVal;
        })

    }

}