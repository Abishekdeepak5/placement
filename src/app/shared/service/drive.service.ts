import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, first, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginModel, Student } from '../models/student.model';
import { Company } from '../models/company.model';
import { Drive, DriveResponse } from '../models/drive.model';
import { TOKEN_KEY } from '../constants/data.model';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  drives: DriveResponse[] =[];
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
  applyDrive(driveId:number){
    const headers=this.getHeader();
    return this.http.post<any>(`${environment.host}/api/student/registerForDrive/${driveId}`,{}, { headers });
  }
  getUpcomingDrives():any{
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.host}/api/student/getUpcomingDrive`, { headers });
  }
  getDrive(driveId:number){
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.host}/api/student/getDrive/${driveId}`, { headers });  
  }

  deleteDrive(driveId:number){
    const headers=this.getHeader();
    return this.http.post<any>(`${environment.host}/api/staff/deleteDrive/${driveId}`, { headers });
  }
  getDriveStudent(driveId:number){
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.host}/api/staff/getDriveStudent/${driveId}`, { headers });  
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