import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/service/company.service';
import { first } from 'rxjs';
import { Company } from '../../../shared/models/company.model';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent{
}
