import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: any;
  public password: any;
  public uid: any;
  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private route: Router, private toastr: ToastrService) {
    this.uid = JSON.parse(localStorage.getItem("uid"));
    if (this.uid != null) {
      this.route.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
  }
  login() {
    this.spinner.show();
    this.auth.signin(this.userName, this.password)
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
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
