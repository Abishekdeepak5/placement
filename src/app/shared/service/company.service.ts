import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  company: BehaviorSubject<Company> = new BehaviorSubject(new Company());
    
  constructor(private http: HttpClient, private router: Router) { }
  

  createCompany(formdata: Company) {
    console.log('Form Data:', formdata);
    return this.http.post<any>(`${environment.host}/api/staff/createCompany`, formdata).pipe(
      map(authData => {
        console.log('Mapped Auth Data:', authData);
        //   this.router.navigate(['/verify/'+formdata.email]);
        return authData;
      }),
      catchError(err => {
        console.error('Error in HTTP Request:', err);
        return throwError(err); // Pass error to the subscriber
      })
    );
  }
}