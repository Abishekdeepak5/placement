import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Student } from '../models/student.model';
import { EMAIL_KEY, TOKEN_KEY, USER_KEY } from '../constants/data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  studentDetails: BehaviorSubject<Student> = new BehaviorSubject(new Student());
  msg: BehaviorSubject<string> = new BehaviorSubject<string>('');
    
  constructor(private http: HttpClient, private router: Router) { }
  
  // register(formdata: Student) {
  //   return this.http.post<any>(`${environment.host}/api/auth/signup`,
  //     formdata
  //   ).pipe(
  //     map(authData=>{
  //       console.log(authData);
  //       this.msg=authData;
  //       if(authData){
  //         this.setInformation(authData);
  //       }
  //   })
  //   );
  // }

  register(formdata: Student) {
    console.log('Form Data:', formdata);
    return this.http.post<any>(`${environment.host}/api/auth/signup`, formdata).pipe(
      map(authData => {
        console.log('Mapped Auth Data:', authData);
        this.msg = authData;
        if (authData) {
          this.setInformation(authData);
        }
        return authData;
      }),
      catchError(err => {
        console.error('Error in HTTP Request:', err);
        return throwError(err); // Pass error to the subscriber
      })
    );
  }

  setInformation(authData: Student) {
    const studentData:Student=authData;
    // this.storeToken(userData.token);
    this.setUser(authData);
  }

  storeToken(token: any) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken():string |null{
    return localStorage.getItem(TOKEN_KEY);
  }

  public setUser(user: Student) {
    localStorage.removeItem(USER_KEY);
    this.setUserObs(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public setEmail(email: string) {
    localStorage.removeItem(EMAIL_KEY);
    //store: boolean, if (store)
    localStorage.setItem(EMAIL_KEY, email);
  }

  setUserObs(user: Student) {
    this.studentDetails.next(user);
  } 
  
  getStudentObs(){
    return this.studentDetails.asObservable();
  }

  getUser(){
    const student: any = localStorage.getItem(USER_KEY);
    const studentInfo: Student = JSON.parse(student);
    return studentInfo;
  }
  logOut(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

}