import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        // BrowserAnimationsModule, // required animations module
        DashboardRoutingModule,
        BsDatepickerModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [AuthService],
    bootstrap: [DashboardComponent]
})
export class DashboardModule { }