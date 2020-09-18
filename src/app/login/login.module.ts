import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        // AngularFireDatabaseModule,
        BrowserAnimationsModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [AuthService],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule { }