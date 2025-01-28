import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/service/theme.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { CommonModule } from '@angular/common';
import { Student } from '../../shared/models/student.model';
import { UserModel } from '../../shared/models/user.model';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  user:string='Student';
  userInfo:UserModel=new UserModel();
  constructor(private themeService: ThemeService,private auth:AuthService) { this.themeService.setInitialTheme();}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  ngOnInit(){ 
       if(this.auth.isStaff()){
          this.user='Staff';
       }else{
        this.user='Student';
       }
       this.userInfo=this.auth.getUser();
  }

  logOut(){
    this.auth.logOut();
  }
}
