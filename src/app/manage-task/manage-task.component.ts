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
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  p: number = 1;
  public taskRef: any = [];
  public viewRef: any = [];
  public taskAssign: any = [];
  public taskStatus: any = [];
  public assignRef: any = [];
  public completed: any = [];
  public taskDetail: any;
  public taskName: any;
  public taskDetailf: any;
  public taskNamef: any;
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
  from_date: any;
  uid: any;
  to_date: any;
  minDate: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public username: any;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private auth: AuthService, public modalService: BsModalService, private fb: AngularFireDatabase, private toastr: ToastrService,
    private http: HttpClient, private route: Router,
    private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.uid = JSON.parse(localStorage.getItem("uid"));
    if (this.uid != "fereRvMoNgeXX2XCi2t7uwnVNr32") {
      this.route.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.fb.list('status').valueChanges().subscribe(res => {
      this.taskStatus = res;
    })
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD/MM/YYYY' });
    var x = JSON.parse(localStorage.getItem("user"));
    this.profile = x.email.charAt(0);
    this.profileName = x.email;
    this.spinner.show();
    this.fb.list('task').valueChanges().subscribe(res => {
      this.taskRef = res;
    })
    this.fb.list('user').valueChanges().subscribe(res => {
      this.userRef = res;
    })
    //Assign task 
    this.fb.list('assign').valueChanges().subscribe(res => {
      this.assignRef = res;
    })
    $(".theme-green .bs-datepicker-head").css(
      "background-color", "#072e58");
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  onValueChanges() {
    this.from_date = $('#from_date').val()
    this.to_date = $('#to_date').val()

    if ($('#to_date').val() < $('#from_date').val()) {
      $('#date_errors').show();
      this.frmdate = '';
    } else {
      $('#date_errors').hide();
    }
  }
  onValueChange() {
    this.from_date = $('#from_date').val()
    this.to_date = $('#to_date').val()

    if ($('#to_date').val() < $('#from_date').val()) {
      $('#date_error').show();
      this.todate = '';
    } else {
      $('#date_error').hide();
    }
  }
  onItemSelect(item: any) {
    console.log(item.option);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  assign(row) {
    this.reset();
    this.taskNamef = row.taskName;
    this.taskDetailf = row.taskDetail;
    this.taskName = row.taskName;
    this.taskDetail = row.taskDetail;
  }
  before() {
    this.fb.list('assign/' + this.selectedUser.uid).valueChanges().subscribe(res => {
      this.taskAssign = res;
    });
  }
  assigned() {
    this.spinner.show();
    let taskobj: any = {
      taskName: this.taskName,
      taskDetail: this.taskDetail,
      from_date: $('#from_date').val(),
      to_date: $('#to_date').val(),
      user: this.selectedUser.uid,
      username: this.selectedUser.name
    };
    console.log(taskobj);
    // let url = 'https://servermonitoring-89515.firebaseio.com/assign/' + this.selectedUser.uid + '.json';
    // let urlstatus = 'https://servermonitoring-89515.firebaseio.com/status.json';

    // this.taskAssign.unshift(taskobj);
    // this.taskStatus.push(taskobj);
    // this.http.put(url, this.taskAssign).subscribe(res => {
    //   $('#assignTask').modal('hide');
    //   this.reset();
    //   this.toastr.success('Success', 'Task assigned successfully!');
    //   location.reload();
    // })
    // this.http.put(urlstatus, this.taskStatus).subscribe(res => {
    // })


    let url = 'https://servermonitoring-89515.firebaseio.com/task.json';
    for (let i = 0; i < this.taskRef.length; i++)
      if (this.taskRef[i].taskName == this.taskNamef && this.taskRef[i].taskDetail == this.taskDetailf) {
        this.taskRef[i] = taskobj;
      }
    $('#assignTask').modal('hide');
    this.toastr.success('Success', 'Task assigned successfully!');

    this.http.put(url, this.taskRef).subscribe(res => {
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  reset() {
    $("#createTaskForm").trigger("reset");
  }
  //******************************************************************Log details function***************************************

  logDetail() {
    this.spinner.show();
    this.route.navigate(['log-detail']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
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
  view(row) {
    this.viewRef = [];
    this.taskDetailA = row.taskDetail;
    this.taskNameA = row.taskName;
    // for (let i = 0; i < this.taskStatus.length; i++)
    //   if (this.taskStatus[i].taskName == this.taskNameA && this.taskStatus[i].taskDetail == this.taskDetailA) {
    //     this.viewRef = this.taskStatus[i];
    //   }
    for (let i = 0; i < this.taskRef.length; i++)
      if (this.taskRef[i].taskName == this.taskNameA && this.taskRef[i].taskDetail == this.taskDetailA) {
        this.viewRef = this.taskRef[i];
      }
  }
}
