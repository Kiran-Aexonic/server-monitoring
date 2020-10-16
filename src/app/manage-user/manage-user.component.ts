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
import { AngularFireAuth } from '@angular/fire/auth';
import { SearchPipe } from '../search.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  p: number = 1;
  public taskRef: any = [];
  public viewRef: any = [];
  public taskAssign: any = [];
  public taskStatus: any = [];
  public assignRef: any = [];
  public taskDetail: any;
  public taskName: any;
  public userRef: any = [];
  public gender: any;
  public genderE: any;
  modalRef: BsModalRef;
  public enableEdit = false;
  public name: any;
  public statusE: any;
  public userName: any;
  public password: any;
  public nameE: any;
  public userNameE: any;
  public passwordE: any;
  public url = 'https://servermonitoring-89515.firebaseio.com/user.json';
  public userid: any;
  public emailSearch: any;
  public selectedUser: any;
  public profileName: any;
  public profile: any;
  public taskNameA: any;
  public taskDetailA: any;
  public frmDateA: any;
  public toDateA: any;
  public todate: any;
  public frmdate: any;
  public passwordConf: any;
  public passwordNew: any;
  public passwordOld: any;
  uid: any;
  userEditId: any;
  editIndex: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public username: any;
  public basePath = '/uploads';
  public userStatus: any = [];
  bsConfig: Partial<BsDatepickerConfig>;
  downloadURL: Observable<any>;
  fb1: any;
  imgE: any;
  constructor(private auth: AuthService, public modalService: BsModalService, private fb: AngularFireDatabase, public firebaseAuth: AngularFireAuth, private toastr: ToastrService,
    private http: HttpClient, private route: Router, private storage: AngularFireStorage,
    private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.uid = JSON.parse(localStorage.getItem("uid"));
    if (this.uid != "fereRvMoNgeXX2XCi2t7uwnVNr32") {
      this.route.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' }, { dateInputFormat: 'DD/MM/YYYY' });
    var x = JSON.parse(localStorage.getItem("user"));
    this.profile = x.email.charAt(0);
    this.profileName = x.email;
    this.fb.list('user').valueChanges().subscribe(res => {
      this.userRef = res;
      console.log(this.userRef)
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  //******************************************************************Image upload functions***************************************
  upload(event) {
    this.fb1 = '';
    var n = Date.now();
    let file = event.target.files[0];
    console.log(event)
    // let fsize = event.target.files[0].size;
    // fsize = Math.round((fsize / 1024));
    // if (fsize >= 4096) {
    //   this.toastr.error('Error', "File too Big, please select a file less than 4mb");
    //   return false;
    // } else if (fsize < 2048) {
    //   this.toastr.error('Error', "File too small, please select a file greater than 2mb");
    //   return false;
    // } else {
    this.spinner.show();
    const filePath = `ProfileImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`ProfileImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb1 = url;
              this.imgE = this.fb1;
            }
          });
          this.spinner.hide();
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    // }
  }
  //******************************************************************back to dashboard functions***************************************
  back() {
    this.spinner.show();
    this.route.navigate(['dashboard']);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
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
          password: this.password,
          uid: this.userid,
          user: res,
          gender: this.gender,
          img: this.fb1 == '' ? undefined : this.fb1,
          status: "active"
        };
        this.resetUser();
        this.fb1 = '';
        $('#exampleModal').modal('hide');
        this.userRef.unshift(obj);
        this.http.put(this.url, this.userRef).subscribe(res => {
        })
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      })
      .catch(error => {
        var errorMessage = error.message;
        $('#exampleModal').modal('hide');
        this.resetUser();
        this.toastr.error('Error', errorMessage);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      });

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
  //******************************************************************Reset functions***************************************
  resetUser() {
    $("#createUserForm").trigger("reset");
  }
  //******************************************************************Get status function***************************************

  getStatus(row) {
    this.userStatus = row;
  }
  //******************************************************************change status function***************************************
  changeStatus() {
    this.spinner.show();
    this.userStatus.status = this.userStatus.status == 'active' ? 'inactive' : 'active';
    for (let i = 0; i < this.userRef.length; i++)
      if (this.userRef[i].uid == this.userStatus.uid) {
        this.userRef[i].status = this.userStatus.status;
      }
    $('#changeStatus').modal('hide');
    this.http.put(this.url, this.userRef).subscribe(res => {
      this.spinner.hide();
      this.toastr.success('Success', 'User status changed successfully!');
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
  //******************************************************************Get data for edit function***************************************
  edit(row) {
    console.log(row)
    this.nameE = row.name;
    this.userNameE = row.email;
    this.passwordE = row.password;
    this.editIndex = this.userRef.indexOf(row);
    this.userEditId = row.uid;
    this.genderE = row.gender;
    this.imgE = row.img;
    this.statusE = row.status;
  }
  //****************************************************************** edit function***************************************
  editUser() {
    if (this.passwordNew != this.passwordConf) {
      $('#error1').show();
      return false;
    }
    else {
      $('#error1').hide();
    }
    this.spinner.show();
    this.userRef[this.editIndex] = {
      email: this.userNameE,
      name: this.nameE,
      password: this.passwordNew == undefined ? this.passwordE : this.passwordNew,
      uid: this.userEditId,
      img: this.imgE,
      gender: this.genderE,
      status: this.statusE
    };
    console.log(this.userRef[this.editIndex])
    $('#editUser').modal('hide');
    this.http.put(this.url, this.userRef).subscribe(res => {
      this.toastr.success('Success', 'User edit successfully!');
    })
    this.auth.changePassword(this.userNameE, this.passwordE, this.passwordNew)
    $('#editUserForm').trigger('reset');
    setTimeout(() => {
      this.spinner.hide();
      this.imgE = '';
      // location.reload();
    }, 2000);
  }
  //****************************************************************** Reset form function***************************************
  resetForm() {
    $('#editUserForm').trigger('reset');
    $('#error1').hide();
    $('#error').hide();

  }
  //****************************************************************** Check new password and confirm password function***************************************
  compare() {
    if (this.passwordNew != this.passwordConf) {
      $('#error1').show();
      this.enableEdit = true;
      return false;
    }
    else {
      $('#error1').hide();
      $('#erroradd').hide();
      this.enableEdit = false;
    }
    if (this.passwordOld == undefined || this.passwordOld == '') {
      $('#erroradd').show();
      this.enableEdit = true;
      return false;
    }
  }
  //****************************************************************** Check password function***************************************
  hiderr() {
    $('#erroradd').hide();

  }
  check() {
    this.enableEdit = true;
    if (this.passwordOld != this.passwordE) {
      $('#error').show();
      this.passwordOld = '';
      return;
    }
    else {
      $('#error').hide();
      this.enableEdit = false;

    }
  }
}
