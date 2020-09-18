import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { LogDetailComponent } from './log-detail.component';

const routes: Routes = [
    {
        path: '',
        component: LogDetailComponent,
        data: {
            title: 'Manage Task '
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogDetailRoutingModule { }