import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ManageTaskComponent } from './manage-task.component';
import { ManageTaskRoutingModule } from './manage-task-routing.module';
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
        ManageTaskRoutingModule,
        NgxPaginationModule,
        NgMultiSelectDropDownModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        ManageTaskComponent
    ],
    providers: [AuthService],
    bootstrap: [ManageTaskComponent]
})
export class ManageTaskModule { }