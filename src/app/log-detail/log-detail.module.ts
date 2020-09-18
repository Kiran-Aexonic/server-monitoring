import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LogDetailComponent } from './log-detail.component';
import { LogDetailRoutingModule } from './log-detail-routing.module';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        LogDetailRoutingModule,
        NgxPaginationModule,
        NgMultiSelectDropDownModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        LogDetailComponent
    ],
    providers: [AuthService],
    bootstrap: [LogDetailComponent]
})
export class LogDetailModule { }