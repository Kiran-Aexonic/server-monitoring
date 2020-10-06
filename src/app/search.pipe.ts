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
            return !!((val.name.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1) ||
                (val.email.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1))
        })
    }
}