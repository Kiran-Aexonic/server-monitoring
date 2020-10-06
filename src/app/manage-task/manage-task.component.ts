import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
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
import { TaskSearchPipe } from '../service/taskSearch.pipe';
declare var $: any;
import * as _ from 'lodash';
@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  @ViewChild('filterName') redel: ElementRef;
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
  maxDate: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public username: any;
  indexDelete: any;
  public searchField: any;
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
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate = new Date();
    this.maxDate.setDate(this.frmdate + 2);
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD/MM/YYYY' });
    var x = JSON.parse(localStorage.getItem("user"));
    this.profile = x.email.charAt(0);
    this.profileName = x.email;
    this.spinner.show();
    this.fb.list('task').valueChanges().subscribe(res => {
      this.taskRef = res;
      console.log(this.taskRef)
    })
    this.fb.list('user').valueChanges().subscribe(res => {
      this.userRef = res;
      this.userRef = this.userRef.filter(person => person.status === 'active');
    });
    this.fb.list('completed-task').valueChanges().subscribe(res => {
      this.completed = res;
    })
    $(".theme-green .bs-datepicker-head").css(
      "background-color", "#072e58");
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  //******************************************************************Date function***************************************

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
  onValueChange(event) {
    if (this.frmdate > this.todate) {
      this.todate = undefined;
      $('#date_error').show();
      console.log(event);
    } else {
      $('#date_error').hide();

    }
  }

  //******************************************************************Select function***************************************

  onItemSelect(item: any) {
    console.log(item.option);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  //******************************************************************Assigned function***************************************

  assign(row) {
    this.reset();
    console.log(row)
    this.taskNamef = row.taskName;
    this.taskDetailf = row.taskDetail;
    this.taskName = row.taskName;
    this.taskDetail = row.taskDetail;
    localStorage.setItem('task-name', row.taskName);
  }

  //******************************************************************Back to dashboard function***************************************

  back() {
    this.spinner.show();
    this.route.navigate(['dashboard']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  //******************************************************************Assigned function***************************************
  assigned() {
    if (this.frmdate > this.todate) {
      this.todate = undefined;
      $('#date_error').show();
      return false;
    }
    else {
      this.spinner.show();
      $('#date_error').hide();
      let dt = new Date();
      let time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      let taskobj: any = {
        taskName: this.taskName,
        taskDetail: this.taskDetail,
        from_date: $('#from_date').val(),
        to_date: $('#to_date').val(),
        user: this.selectedUser.uid,
        username: this.selectedUser.name,
        email: this.selectedUser.email,
        time: time,
        status: 'Assigned'
      };
      let url = 'https://servermonitoring-89515.firebaseio.com/task.json';
      for (let i = 0; i < this.taskRef.length; i++)
        if (this.taskRef[i].taskName == this.taskNamef && this.taskRef[i].taskDetail == this.taskDetailf) {
          this.taskRef[i] = taskobj;
        }
      $('#assignTask').modal('hide');
      this.toastr.success('Success', 'Task assigned successfully!');
      // for log details
      this.completed.unshift(taskobj);
      let url1 = 'https://servermonitoring-89515.firebaseio.com/completed-task.json';
      this.http.put(url1, this.completed).subscribe(res => {
      })
      //
      this.http.put(url, this.taskRef).subscribe(res => {
      })
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }
  }
  hideError() {
    $('#date_error').hide();
  }
  //******************************************************************Reset function***************************************

  reset() {
    $("#createTaskForm").trigger("reset");
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

  //******************************************************************View details function***************************************
  view(row) {
    console.log(row);
    this.viewRef = [];
    this.taskAssign = [];
    this.taskDetailA = row.taskDetail;
    this.taskNameA = row.taskName;
    for (let i = 0; i < this.taskRef.length; i++)
      if (this.taskRef[i].taskName == this.taskNameA && this.taskRef[i].taskDetail == this.taskDetailA) {
        this.viewRef = this.taskRef[i];
      }
    for (let i = 0; i < this.completed.length; i++)
      if (this.completed[i].taskName == this.taskNameA) {
        this.taskAssign.push(this.completed[i]);
      }
    // this.taskAssign = _.sortBy(this.taskAssign, ['from_date', 'time']).reverse();
    this.taskAssign = _.orderBy(this.taskAssign, ['from_date', 'time'], ['asc', 'desc']);
  }
  //******************************************************************Delete function***************************************
  deleteIndex(row) {
    this.indexDelete = this.taskRef.indexOf(row);
  }
  delete() {
    this.spinner.show();
    let url = 'https://servermonitoring-89515.firebaseio.com/task.json';
    this.taskRef.splice(this.indexDelete, 1);
    this.http.put(url, this.taskRef).subscribe(res => {
      $('#deleteTask').modal('hide');
      this.toastr.success('Success', 'Record deleted successfully!');
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
