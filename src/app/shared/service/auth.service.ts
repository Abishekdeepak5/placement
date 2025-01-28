import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginModel, Student } from '../models/student.model';
import { EMAIL_KEY, TOKEN_KEY, USER_KEY } from '../constants/data.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel());
    
  constructor(private http: HttpClient, private router: Router) { }
  

  register(formdata: Student) {
    console.log('Form Data:', formdata);
    return this.http.post<any>(`${environment.host}/api/auth/signup`, formdata).pipe(
      map(authData => {
        console.log('Mapped Auth Data:', authData);
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
  verify(student:Student){
    console.log('Form Data:', student);
    return this.http.post<any>(`${environment.host}/api/auth/signup/verify`, student).pipe(
      map(data => {
        console.log('Mapped Auth Data:', data);
        this.router.navigate(['/login']);
        return data;
      }),
      catchError(err => {
        console.error('Error in HTTP Request:', err);
        return throwError(err); // Pass error to the subscriber
      })
    );
  }
  login(loginObj:LoginModel){
    console.log('Form Data:', loginObj);
    return this.http.post<any>(`${environment.host}/api/auth/login`,loginObj).pipe(
      map(data => {
        console.log('Mapped Auth Data:', data);
        data.user.token=data.accessToken;
        this.setInformation(data.user);
        return data;
      }),
      catchError(err => {
        console.log(err.error.msg);
        console.error('Error in HTTP Request:', err);
        return throwError(err); 
      })
    );
  }

  sendOtp(loginObj:LoginModel){
    return this.http.post<any>(`${environment.host}/api/auth/sendOtp`,loginObj);  
  }

  setInformation(authData: UserModel) {
    const studentData:UserModel=authData;
    this.storeToken(studentData.token);
    this.setUser(authData);
  }

  storeToken(token: any) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken():string |null{
    return localStorage.getItem(TOKEN_KEY);
  }

  public setUser(user: UserModel) {
    localStorage.removeItem(USER_KEY);
    this.setUserObs(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public setEmail(email: string) {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.setItem(EMAIL_KEY, email);
  }

  setUserObs(user: UserModel) {
    this.userDetails.next(user);
  } 
  
  getStudentObs(){
    return this.userDetails.asObservable();
  }

  getUser():UserModel{
    const student: any = localStorage.getItem(USER_KEY);
    const studentInfo: UserModel= JSON.parse(student);
    return studentInfo;
  }
  isStaff():boolean{
    const person=this.getUser();
    console.log(person);
    console.log(person.role,person.role=='STUDENT');
    if(person.role=='STAFF'){
       return true;
    }
    return false;
  }
  logOut(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }

}