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

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent implements OnInit {
  p: number = 1;
  public taskRef: any = [];
  public viewRef: any = [];
  public taskAssign: any = [];
  public taskStatus: any = [];
  public assignRef: any = [];
  public completed: any = [];
  public taskDetail: any;
  public taskName: any;
  public userRef: any = [];
  public selectedUser: any;
  public profileName: any;
  public profile: any;
  public taskNameA: any;
  public taskDetailA: any;
  public frmDateA: any;
  public toDateA: any;
  public todate: any;
  public frmdate: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public username: any;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private auth: AuthService, public modalService: BsModalService, private fb: AngularFireDatabase, private toastr: ToastrService,
    private http: HttpClient, private route: Router,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    var x = JSON.parse(localStorage.getItem("user"));
    this.profile = x.email.charAt(0);
    this.profileName = x.email;
    this.logDetail();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }


  //******************************************************************Log details function***************************************

  logDetail() {
    console.log("hey");
    this.fb.list('completed-task').valueChanges().subscribe(res => {
      this.completed = res;
      console.log(this.completed)
    })
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
