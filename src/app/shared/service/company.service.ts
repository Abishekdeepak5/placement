import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Company, CompanyDto } from '../models/company.model';
import { TOKEN_KEY } from '../constants/data.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  company: BehaviorSubject<Company> = new BehaviorSubject(new Company());
  companies:Company[]=[];
  constructor(private http: HttpClient, private router: Router) { }
  

  createCompany(formdata: CompanyDto) {
    console.log('Form Data:', formdata);
    return this.http.post<any>(`${environment.host}/api/staff/createCompany`, formdata).pipe(
      map(authData => {
        console.log('Mapped Auth Data:', authData);
        return authData;
      }),
      catchError(err => {
        console.error('Error in HTTP Request:', err);
        return throwError(err); 
      })
    );
  }
  
  getCompanies(){
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.host}/api/student/getCompanies`, { headers });  
  }

  getCompanyDrives(companyId:number){
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.host}/api/student/getDrives/${companyId}`, { headers });  
  }
  deleteCompany(companyId:number){
    const headers=this.getHeader();
    return this.http.post<any>(`${environment.host}/api/staff/deleteCompany/${companyId}`, { headers });    
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