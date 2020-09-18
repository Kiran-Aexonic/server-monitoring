import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: any;
  public password: any;
  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  login() {
    this.spinner.show();
    this.auth.signin(this.userName, this.password)
    // $('#login').trigger("reset");
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    // {
    //   this.spinner.show();
    //   if (this.auth.isLogin == true) {
    //     this.toastr.success('Success', 'You are logged in successfully!');
    //     $('#createUserForm').trigger('reset');
    //   }
    //   else {
    //     this.toastr.error('Error', 'Invalid credentials!');
    //   }
    //   this.spinner.hide();
    // }
  }
  animate() {
    $('.input100').each(function () {
      $(this).on('blur', function () {
        if ($(this).val().trim() != "") {
          $(this).addClass('has-val');
        }
        else {
          $(this).removeClass('has-val');
        }
      })
    })
  }
}
