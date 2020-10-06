import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'taskSearchfilter'
})
export class TaskSearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            // return !!((val.taskName.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1) ||
            //     (val.email.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1))
            return !!((val.status.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.status.indexOf(args || '') !== - 1) ||
                (val.taskName.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.taskName.indexOf(args || '') !== - 1) ||
                (val.email.toUpperCase().indexOf(args.toUpperCase() || '') !== - 1 || val.email.indexOf(args || '') !== - 1))
        })
    }
}