import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DriveService } from '../../../shared/service/drive.service';
import { first } from 'rxjs';
import { DriveResponse } from '../../../shared/models/drive.model';
import { DateformatPipe } from '../../../shared/pipes/date-format.pipe';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../shared/service/theme.service';
import { AuthService } from '../../../shared/service/auth.service';
import { Student, StudentDetail } from '../../../shared/models/student.model';
import { ExcelService } from '../../../shared/service/excel.service';

@Component({
  selector: 'app-drive-detail',
  standalone: true,
  imports: [DateformatPipe,CommonModule],
  templateUrl: './drive-detail.component.html',
  styleUrl: './drive-detail.component.css'
})
export class DriveDetailComponent {
  drive:DriveResponse=new DriveResponse();
  isStaff:boolean=false;
  students:Student[]=[];
  isDark:boolean=false;
  constructor(private router: Router,private route:ActivatedRoute,private driveService:DriveService,private theme:ThemeService,private ele:ElementRef,private auth:AuthService,private excelService:ExcelService) {}
  ngOnInit(): void {
    this.isStaff=this.auth.isStaff();

    this.route.paramMap.subscribe((params: ParamMap) => {
      var driveId=params.get('driveId');
      if(driveId!=null){
        this.driveService.getDrive(Number(driveId)).pipe(first()).subscribe(
          (data:DriveResponse)=>{
            this.drive=data;
            if(this.isStaff==true){
              this.driveService.getDriveStudent(this.drive.drive.id).pipe(first()).subscribe((students:any)=>{
                this.students=students;
                let table1=this.ele.nativeElement.querySelector(".table1");
                table1.classList.toggle('table-dark', this.isDark);
                console.log(students);
              },(err:any)=>{
                console.log(err);
              });
            }
            console.log(data);
          },(err:any)=>{
            console.log(err);
          });
        }
    });
    this.theme.darkMode$.subscribe((value)=>{
      let table=this.ele.nativeElement.querySelector(".table");
      console.log(table);
      table.classList.toggle('table-dark', value);
      this.isDark=value;
      let table1=this.ele.nativeElement.querySelector(".table1");
      table1.classList.toggle('table-dark', value);
      // table.classList.toggle('light-mode', !value);
    });
    
  }
  download(){
    let studentDetail=[];
    for(let student of this.students){
      studentDetail.push(new StudentDetail(student));
    }
    this.excelService.exportToExcel(studentDetail);
  }
}
