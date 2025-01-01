import { Component } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../shared/service/company.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [    CommonModule,FormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
    company:Company=new Company();
    constructor(private companyService:CompanyService){}
    createCompany(){
      console.log(this.company);
      this.companyService.createCompany(this.company).pipe(first()).subscribe(
        (data:any)=>{ 
          console.log(data);
        },
        (err:any)=>{
          console.error('Error During Registration:', err);
        });
    }
    
}
