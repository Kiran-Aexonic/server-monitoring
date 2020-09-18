import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList, } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $: any;
interface user {
  name: string;
  email: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public admin: any = false;
  public uid: any;
  public userid: any;
  public userName: any;
  public password: any;
  public name: any;
  public taskName: any;
  public taskDetail: any;
  public taskNameA: any;
  public taskDetailA: any;
  public profileName: any;
  public profile: any;
  public isDone: any;
  modalRef: BsModalRef;
  public completed: any = [];
  public url = 'https://servermonitoring-89515.firebaseio.com/user.json';
  public taskUrl = 'https://servermonitoring-89515.firebaseio.com/task.json';
  public userRef: any = [];
  public taskRef: any = [];
  public taskAssign: any = [];
  public assigned: any = [];
  public statusRef: any = [];
  taskDateA: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public disableStatus: any;
  constructor(private fb: AngularFireDatabase, private auth: AuthService, public modalService: BsModalService, private spinner: NgxSpinnerService,
    private router: Router, private toastr: ToastrService, private http: HttpClient, public firebaseAuth: AngularFireAuth, private route: Router) {
    this.spinner.show();
    this.uid = JSON.parse(localStorage.getItem("uid"));
    if (this.uid == "fereRvMoNgeXX2XCi2t7uwnVNr32") {
      this.admin = true;
      this.fb.list('task').valueChanges().subscribe(res => {
        this.taskRef = res;
      });
    }
    else {
      // this.fb.list('assign/' + this.uid).valueChanges().subscribe(res => {
      //   this.taskAssign = res;
      // })

      this.fb.list('task').valueChanges().subscribe(res => {
        this.taskRef = res;
      });
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
  ngOnInit(): void {
    this.spinner.show();
    var x = JSON.parse(localStorage.getItem("user"));
    this.profile = x.email.charAt(0);
    this.profileName = x.email;
    this.fb.list('completed-task').valueChanges().subscribe(res => {
      this.completed = res;
    })
    this.fb.list('user').valueChanges().subscribe(res => {
      this.userRef = res;
    })
    this.fb.list('status').valueChanges().subscribe(res => {
      this.statusRef = res;
    })
    this.modalService.onHide.subscribe((e) => {
    });
    this.dropdownList = [
      { item_id: '1', item_text: 'Complete' },
      { item_id: '2', item_text: 'Inprogress' },
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    setTimeout(() => {
      console.log(this.taskRef)
      for (let i = 0; i < this.taskRef.length; i++)
        if (this.taskRef[i].user == this.uid) {
          this.taskAssign.push(this.taskRef[i]);
        }
    }, 3000);
  }
  //******************************************************************Assign task functions***************************************
  assign(row) {
    this.assigned = row;
    for (let i = 0; i < this.taskRef.length; i++)
      if (row.taskName == this.taskRef[i].taskName && row.taskDetail == this.taskRef[i].taskDetail) {
        row.status = this.taskRef[i].status;
      }
    if (row.status == 'Complete') {
      this.selectedItems = [{ item_id: '1', item_text: 'Complete' }]
    } else if (row.status == 'Inprogress') {
      this.selectedItems = [{ item_id: '2', item_text: 'Inprogress' }]
    } else {
      this.selectedItems = [];
    }
  }

  //******************************************************************Create user functions***************************************
  createUser() {
    this.spinner.show();
    this.firebaseAuth.
      createUserWithEmailAndPassword(this.userName, this.password)
      .then(res => {
        this.userid = res.user.uid;
        this.toastr.success('Success', 'User created successfully!');
        let obj: any = {
          email: this.userName,
          name: this.name,
          uid: this.userid
        };
        this.resetUser();
        this.modalRef.hide();
        this.userRef.push(obj);
        this.http.put(this.url, this.userRef).subscribe(res => {
        })
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      })
      .catch(error => {
        var errorMessage = error.message;
        this.modalRef.hide();
        this.resetUser();
        this.toastr.error('Error', errorMessage);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      });

  }

  //******************************************************************Create task functions***************************************
  createTask() {
    this.spinner.show();
    let taskobj: any = {
      taskName: this.taskName,
      taskDetail: this.taskDetail
    };
    this.taskRef.unshift(taskobj);
    this.http.put(this.taskUrl, this.taskRef).subscribe(res => {
      $('#exampleModal').modal('hide');
      this.resetTask();
      this.toastr.success('Success', 'Task created successfully!');
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  //******************************************************************Reset functions***************************************
  resetUser() {
    $("#createUserForm").trigger("reset");
  }
  resetTask() {
    $("#createTaskForm").trigger("reset");
  }
  //******************************************************************Manage task functions***************************************
  manageTask() {
    this.spinner.show();
    this.router.navigate(['manage-task']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  //******************************************************************Manage user functions***************************************
  manageTaskUser() {
    this.spinner.show();
    this.router.navigate(['manage-user']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  //******************************************************************Open modal functions***************************************
  openModal(template: TemplateRef<any>) {
    const user = {
      id: 10
    };
    this.modalRef = this.modalService.show(template, {
      initialState: user
    });
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
  //******************************************************************Animation functions***************************************
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

  onItemSelect(item: any) {
    console.log(item);
    this.isDone = true;
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  logDetail() {
    this.spinner.show();
    this.router.navigate(['log-detail']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  getStatus(row) {
    this.spinner.show();
    $('#assignTask').modal('hide');
    if (this.selectedItems[0].item_text == 'Complete') {
      row.status = 'Complete';
      this.completed.unshift(row);
      console.log(this.completed)
      this.disableStatus = true;
      let url = 'https://servermonitoring-89515.firebaseio.com/completed-task.json';
      this.http.put(url, this.completed).subscribe(res => {
      })
    }
    // for (let i = 0; i < this.statusRef.length; i++)
    //   if (this.statusRef[i].taskName == row.taskName && this.statusRef[i].taskDetail == row.taskDetail && this.statusRef[i].user == row.user) {
    //     this.statusRef[i].status = this.selectedItems[0].item_text;
    //   }
    // for (let i = 0; i < this.taskAssign.length; i++)
    //   if (this.statusRef[i].taskName == row.taskName && this.statusRef[i].taskDetail == row.taskDetail && this.statusRef[i].user == row.user) {
    //     this.statusRef[i].status = this.selectedItems[0].item_text;
    //   }

    // let urlstatus = 'https://servermonitoring-89515.firebaseio.com/status.json';
    // this.http.put(urlstatus, this.statusRef).subscribe(res => {
    // })
    // this.http.put(urlstatus, this.statusRef).subscribe(res => {
    // })

    for (let i = 0; i < this.taskRef.length; i++)
      if (this.taskRef[i].taskName == row.taskName && this.taskRef[i].taskDetail == row.taskDetail && this.taskRef[i].user == row.user && this.taskRef[i].from_date == row.from_date && this.taskRef[i].to_date == row.to_date) {
        this.taskRef[i].status = this.selectedItems[0].item_text;
      }
    $('#assignTask').modal('hide');
    let url = 'https://servermonitoring-89515.firebaseio.com/task.json';
    this.http.put(url, this.taskRef).subscribe(res => {
      this.toastr.success('Success', 'Status updated successfully!');
      location.reload();
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}