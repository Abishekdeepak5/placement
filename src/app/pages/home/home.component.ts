import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {  RouterModule } from '@angular/router';
import { DriveService } from '../../shared/service/drive.service';
import { ThemeService } from '../../shared/service/theme.service';
import { first } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent,RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  showSidebar:boolean=false;
  constructor(private driveService:DriveService,private themeService:ThemeService,private auth:AuthService,private ele:ElementRef){}
  ngOnInit(){
    console.log(this.auth.getUser());
    console.log(this.auth.isStaff());
    // this.themeService.setInitialTheme();
    // this.themeService.setTheme(true);
    this.driveService.getUpcomingDrives().pipe(first()).subscribe(
      (data:any)=>{
        console.log(data);
      },
    (err:any)=>{
      console.log(err);
    });
  }

  toggleSidebar(){
    this.showSidebar=!this.showSidebar;
    console.log(this.showSidebar);
    let sidebar=this.ele.nativeElement.querySelector(".sidebar");
    sidebar.classList.toggle('show', this.showSidebar);  
    
    let sidebarCross=this.ele.nativeElement.querySelector(".hamburger-cross");
    sidebarCross.classList.toggle('display-cross', this.showSidebar);  
    
  }
}
