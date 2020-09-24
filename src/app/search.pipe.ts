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
            // let rVal = (val.name.toLocaleLowerCase().includes(args)) || (val.email.toLocaleLowerCase().includes(args))
            //     || (val.name.toLocaleUpperCase().includes(args)) || (val.email.toLocaleUpperCase().includes(args))
            //     || (val.name.toString().includes(args)) || (val.email.toString().includes(args));

            return !!((val.name.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1) ||
                (val.email.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1))
            // return rVal;
        })

    }

}