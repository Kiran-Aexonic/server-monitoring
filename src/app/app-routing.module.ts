import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { AuthenticationGuard } from './service/authentication.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { LogDetailComponent } from './log-detail/log-detail.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'login'
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'dashboard'
    },
  },
  {
    path: 'manage-task',
    component: ManageTaskComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'Manage task'
    },
  },
  {
    path: 'manage-user',
    component: ManageUserComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'Manage user'
    },
  },
  {
    path: 'log-detail',
    component: LogDetailComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'Log Detail'
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
