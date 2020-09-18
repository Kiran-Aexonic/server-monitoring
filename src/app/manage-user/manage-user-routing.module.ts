import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { ManageUserComponent } from './manage-user.component';

const routes: Routes = [
    {
        path: '',
        component: ManageUserComponent,
        data: {
            title: 'Manage User '
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageUserRoutingModule { }