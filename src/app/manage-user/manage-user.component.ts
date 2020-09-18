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
  modalRef: BsModalRef;
  public name: any;
  public userName: any;
  public password: any;
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
  uid: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public username: any;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private auth: AuthService, public modalService: BsModalService, private fb: AngularFireDatabase, public firebaseAuth: AngularFireAuth, private toastr: ToastrService,
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
        console.log(res);
        this.userid = res.user.uid;
        console.log(res.user.metadata.creationTime)
        this.toastr.success('Success', 'User created successfully!');
        let obj: any = {
          email: this.userName,
          name: this.name,
          uid: this.userid,
          // date:
        };
        this.resetUser();
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
