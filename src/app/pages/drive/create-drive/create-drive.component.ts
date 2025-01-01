import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Drive } from '../../../shared/models/drive.model';
import { DriveService } from '../../../shared/service/drive.service';
import { first } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-create-drive',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-drive.component.html',
  styleUrl: './create-drive.component.css'
})
export class CreateDriveComponent implements OnInit{
  drive:Drive=new Drive();
  constructor(private router: Router,private route:ActivatedRoute,private driveService:DriveService){}
  createDrive(){
    console.log(this.drive);
    this.driveService.createDrive(this.drive).pipe(first()).subscribe(
      (data:any)=>{ 
        console.log(data);
      },
      (err:any)=>{
        console.error('Error During Registration:', err);
      });
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      var companyId=params.get('companyId');
      if(companyId!=null){
        this.drive.companyId=Number(companyId);
      }else{
        this.router.navigate(['/']);
      }
      console.log(companyId);
    });
  }
}
