import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Student } from '../../shared/models/student.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
  standalone:true,
  imports:[
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,]
})
export class OtpComponent {
  student:Student=new Student();
  constructor(private router: Router,private route:ActivatedRoute,private auth:AuthService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var email=params.get('email');
      this.student.email=email?email:'';
      console.log(email);
    });
  }
  verifyOTP(){
    console.log(this.student);
    this.auth.verify(this.student).pipe(first()).subscribe(
      (data: any) => {
        console.log('Successful Response:', data);
      },
      (err: any) => {
        console.error('Error During Registration:', err);
      }
    );
  }
}