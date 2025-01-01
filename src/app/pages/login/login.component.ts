import { Component } from '@angular/core';
import { LoginModel } from '../../shared/models/student.model';
import { AuthService } from '../../shared/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  student:LoginModel=new LoginModel();
  constructor(private router: Router,private route:ActivatedRoute,private auth:AuthService) {}
  ngOnInit(): void {}
  login(){
    console.log(this.student);
    this.auth.login(this.student).pipe(first()).subscribe(
      (data: any) => {
        console.log('Successful Response:', data);
      },
      (err: any) => {
        console.error('Error During Registration:', err);
      }
    );
  }
}