import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Mark } from '../models/student.model';
import {TOKEN_KEY} from '../constants/data.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  company: BehaviorSubject<Mark> = new BehaviorSubject(new Mark());  
  constructor(private http: HttpClient, private router: Router) { }

  setMark(marks: Mark){
    const headers=this.getHeader();
    return this.http.put<any>(`${environment.host}/api/student/uploadMarks`, marks, { headers });
  }

  getMark(){
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.host}/api/student/getMarks`, { headers });
  }
  
  getHeader():HttpHeaders{
    const tokenKey=localStorage.getItem(TOKEN_KEY)?.toString();
    console.log(tokenKey);
    return new HttpHeaders({
      'Authorization': 'Bearer ' +tokenKey,
      'Content-Type': 'application/json',
    });
  }

}