import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { first } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  student: Student = new Student();
  errorMessage:string = ""  ;
  jsonData:any;
  
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    
  }
  
  showPhoneNumberError: boolean = false;
  phoneNum:any;
  formatPhoneNumber(event: any) {
    let phoneNumber = event.target.value.replace(/\D/g, ''); 
    if (phoneNumber.length > 3) {
      phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
    }  
    if (phoneNumber.length > 7) {
      phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
    }
    event.target.value = phoneNumber;
    this.phoneNum=phoneNumber;
    this.showPhoneNumberError = phoneNumber.length > 0 && phoneNumber.replace(/\D/g, '').length !== 10;
  }
  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', form.value);
    } else {
      console.log('Form is invalid');
    }
  }
  onRegister1() {
    // if (!this.registerForm.valid) {
    //   alert('Please fill in all required fields correctly.');
    //   return;
    // }
    // this.validateEmail();

      // if (!this.email.valid) {
      //  return;
      // }


    console.log(this.student);
    this.auth.register(this.student).pipe(first()).subscribe(
      (data: any)=>{
        this.jsonData=data;
       
        console.log(data);
      },
      (err: { message: string; })=>{
        this.errorMessage = err.message;
      });      
  }

  onRegister() {
    console.log('Starting Registration');
    this.auth.register(this.student).pipe(first()).subscribe(
      (data: any) => {
        console.log('Successful Response:', data);
        this.jsonData = data;
      },
      (err: any) => {
        console.error('Error During Registration:', err);
        this.errorMessage = err.message;
      }
    );
  }
}

