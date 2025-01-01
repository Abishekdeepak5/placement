import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginModel, Student } from '../models/student.model';
import { Company } from '../models/company.model';
import { Drive } from '../models/drive.model';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  company: BehaviorSubject<Company> = new BehaviorSubject(new Company());
    
  constructor(private http: HttpClient, private router: Router) { }
  

  createDrive(formdata: Drive) {
    console.log('Form Data:', formdata);
    return this.http.post<any>(`${environment.host}/api/staff/createDrive`, formdata).pipe(
      map(authData => {
        console.log('Mapped Auth Data:', authData);
        //   this.router.navigate(['/verify/'+formdata.email]);
        return authData;
      }),
      catchError(err => {
        console.error('Error in HTTP Request:', err);
        return throwError(err); 
      })
    );
  }
}