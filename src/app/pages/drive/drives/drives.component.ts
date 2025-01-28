import { Component, Input, OnInit } from '@angular/core';
import { DriveResponse } from '../../../shared/models/drive.model';
import { DriveService } from '../../../shared/service/drive.service';
import {DateformatPipe} from '../../../shared/pipes/date-format.pipe';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Base } from '../../../shared/models/base.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { CompanyService } from '../../../shared/service/company.service';

@Component({
  selector: 'app-drives',
  standalone: true,
  imports: [CommonModule,DateformatPipe],
  templateUrl: './drives.component.html',
  styleUrl: './drives.component.css'
})
export class DrivesComponent implements OnInit{
  drives:DriveResponse[]=[];
  isStaff:boolean=false;
  companyId:number=0;
  constructor(private driveService:DriveService,private route:ActivatedRoute,private router:Router,private auth:AuthService,private companyService:CompanyService){}
  ngOnInit(): void {
    this.isStaff=this.auth.isStaff();
    this.route.paramMap.subscribe((params: ParamMap) => {
      var companyId=params.get('companyId');
      this.companyId=companyId?Number(companyId):0;
      console.log(companyId);
    });
    if(this.companyId==0){
      if(this.driveService.drives.length==0){
        this.getUpcomingDrive();
      }else{
        this.drives=this.driveService.drives;
      }
    }else if(this.companyId!=0){
        this.getCompanyDrives(this.companyId);
    }
    console.log(this.drives);
  }
  getCompanyDrives(companyId:number){
    this.companyService.getCompanyDrives(companyId).pipe(first()).subscribe((data:any)=>{
      this.drives=data;
      console.log(data);
    }
    ,(err:any)=>{
      console.log(err);
    });
  }
  applyDrive(drive:DriveResponse){
    console.log(drive);
    this.driveService.applyDrive(drive.drive.id).pipe(first()).subscribe(
      (data:Base)=>{
        console.log(data);
        if(data.isSuccess==false){
            if(data.error.length>0){
              if(data.error[data.error.length-1]=="Please update mark"){
                  this.router.navigate(['/student/marks']);
              }
            }
        }
        this.getUpcomingDrive();
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }
  showDrive(drive:DriveResponse){
      this.router.navigate(['/home/drive/'+drive.drive.id]);
  }
  getUpcomingDrive(){
    this.driveService.getUpcomingDrives().pipe(first()).subscribe(
      (data:DriveResponse[])=>{
        console.log(data);
        this.driveService.drives=data;
        this.drives=this.driveService.drives;
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }
  showEditDrive(driveId:number){
    this.router.navigate([`drive/${driveId}/edit`]);
  }
  deleteDrive(driveId:number){
    this.driveService.deleteDrive(driveId).pipe(first()).subscribe((data:any)=>{},(err:any)=>{})
  }
}
