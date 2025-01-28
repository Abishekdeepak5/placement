import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Drive, DriveResponse } from '../../../shared/models/drive.model';
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
        this.router.navigate(['/home/drives']).then(() => {
          window.location.reload();
        });
      },
      (err:any)=>{
        console.error('Error During Registration:', err);
      });
  }
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      var companyId=params.get('companyId');
      var driveId=params.get('driveId');
      if(companyId!=null){
        this.drive.companyId=Number(companyId);
      }else if(driveId==null){
        this.router.navigate(['/']);
      }
      console.log(driveId);
      console.log(driveId!=null);
      if(driveId!=null){
        this.driveService.getDrive(Number(driveId)).pipe(first()).subscribe((data:DriveResponse)=>{
          this.drive=data.drive;
          console.log(data);
          if(data.drive.historyOfAllowed==true){
            this.drive.historyOfAllowed="true";
          }else{
            this.drive.historyOfAllowed="false";
          }
          this.drive.date=new Date(data.drive.date).toISOString().split('T')[0];
          this.drive.registrationClosingDate=new Date(data.drive.registrationClosingDate).toISOString().split('T')[0];
          console.log(this.drive);
        },
        (err:any)=>{
          console.log(err);
        });
      }
      console.log(companyId);
    });
  }
}
