import { Injectable } from '@angular/core';
import { auth } from "firebase/app";
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { $ } from 'protractor';
interface user {
  name: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin: any;
  users: Observable<any[]>;
  userList: AngularFireList<user> = null;
  userRef: any = [];
  public uid: any;
  url = 'https://servermonitoring-89515.firebaseio.com/users.json';
  constructor(
    private afAuth: AngularFireAuth,
    public firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore, private http: HttpClient,
    private router: Router, private NgxSpinnerService: NgxSpinnerService, private toastr: ToastrService,
  ) {
  }

  writeUserData(arr) {
    var ref = firebase.database().ref();
    ref.on("value", (snapshot) => {
      let userRef = [];
      userRef = snapshot.val();
      console.log(userRef.values);
    }, (error) => {
      console.log("Error: " + error.code);
    });
  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.NgxSpinnerService.show();
        this.isLogin = true;
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem("uid", JSON.stringify(result.user.uid));
        this.NgxSpinnerService.hide();
        // this.toastr.success('Success', 'You are logged in successfully!');
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        this.NgxSpinnerService.show();
        this.isLogin = false;
        this.NgxSpinnerService.hide();
        this.toastr.error('Error', 'Invalid credentials!');
        // location.reload();

      });
  }
  changePassword(email, oldPassword, newPassword) {
    firebase.auth()
      .signInWithEmailAndPassword(email, oldPassword)
      .then((user) => {
        firebase.auth().currentUser.updatePassword(newPassword).then(() => {
          this.toastr.success('Success', 'User updated successfully!');
          console.log('New password has been saved');
          this.NgxSpinnerService.hide();
        }).catch((err) => {
          console.log(err);
          this.NgxSpinnerService.hide();
        });

      }).catch((err) => {
        console.log(err);
        this.NgxSpinnerService.hide();
      });
  }
}
