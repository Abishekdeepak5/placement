import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { CompanyService } from '../../../shared/service/company.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/service/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit{
  companies:Company[]=[];
  isStaff:boolean=false;
  constructor(private company:CompanyService,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    if(this.company.companies.length==0){
      this.getCompanies();
    }else{
      this.companies=this.company.companies;
    }
    this.isStaff=this.authService.isStaff();
  }
  getCompanies(){
    this.company.getCompanies().pipe(first()).subscribe(
      (data:any)=>{
        this.company.companies=data;
        this.companies=data;
        console.log(data);
      },(err:any)=>{
        console.log(err);
      });
  }
  createCompany(){
    this.router.navigate(['/company/create']);
  }
  deleteCompany(company:Company){
    this.company.deleteCompany(company.id).pipe(first()).subscribe(
      (data:any)=>{
        this.router.navigate(['/home/drives']);
    },(err:any)=>{
      console.log(err);
    });
  }
  showDriveCreate(company:Company){
    console.log(company);
    this.router.navigate([`/drive/${company.id}/create`]);
  }
  showDrives(company:Company){
    this.router.navigate([`/home/company/${company.id}/drives`]);
  }
}
