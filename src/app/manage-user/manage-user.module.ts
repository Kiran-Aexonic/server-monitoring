import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ManageUserComponent } from './manage-user.component';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchPipe } from '../search.pipe';
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ManageUserRoutingModule,
        NgxPaginationModule,
        NgMultiSelectDropDownModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        ManageUserComponent,
        SearchPipe
    ],
    providers: [AuthService],
    bootstrap: [ManageUserComponent]
})
export class ManageUserModule { }