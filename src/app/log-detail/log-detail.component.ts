import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
declare var $: any;
import * as _ from 'lodash';
@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent implements OnInit {
  p: number = 1;
  public taskAssign: any = [];
  public completed: any = [];
  public taskDetail: any;
  public taskName: any;
  public selectedUser: any;
  public profileName: any;
  public profile: any;
  public username: any;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private auth: AuthService, public modalService: BsModalService, private fb: AngularFireDatabase, private toastr: ToastrService,
    private http: HttpClient, private route: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

    this.fb.list('completed-task').valueChanges().subscribe(res => {
      this.completed = res;
      console.log(res);
    })
    this.spinner.show();
    var x = JSON.parse(localStorage.getItem("user"));
    this.profile = x.email.charAt(0);
    this.profileName = x.email;

    setTimeout(() => {
      this.logDetail();
      this.spinner.hide();
    }, 8000);
  }
  //******************************************************************Back to dashboard function***************************************

  back() {
    this.spinner.show();
    this.route.navigate(['manage-task']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  //******************************************************************Log details function***************************************

  logDetail() {
    this.taskName = localStorage.getItem('task-name');
    for (let i = 0; i < this.completed.length; i++)
      if (this.completed[i].taskName == this.taskName) {
        this.taskAssign.push(this.completed[i]);
      }
    this.taskAssign = _.sortBy(this.taskAssign, 'from_date').reverse();
  }
  //******************************************************************Logout function***************************************
  logout() {
    this.spinner.show();
    this.auth.logout();
    localStorage.removeItem("uid");
    this.toastr.success('Success', 'You are logout!');
    this.route.navigate(['/login']);
    this.spinner.hide();
  }
}
