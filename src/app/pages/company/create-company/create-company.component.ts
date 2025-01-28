import { Component } from '@angular/core';
import { Company, CompanyDto } from '../../../shared/models/company.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../shared/service/company.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [    CommonModule,FormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
    company:CompanyDto=new CompanyDto();
    constructor(private companyService:CompanyService,private router:Router){}
    createCompany(){
      console.log(this.company);
      this.companyService.createCompany(this.company).pipe(first()).subscribe(
        (data:any)=>{ 
          console.log(data);
          this.router.navigate(['/home/companies']).then(() => {
            window.location.reload();
          });
        },
        (err:any)=>{
          console.error('Error During Registration:', err);
        });
    }
    
}
