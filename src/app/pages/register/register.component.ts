import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../shared/models/student.model';
import { first } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';
import { UserModel } from '../../shared/models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  student: Student = new Student();
  errorMessage:string = ""  ;
  isStudent:boolean=true;
  jsonData:any;
  user:UserModel=new UserModel();
  secret:number=0;
  
  constructor(private auth:AuthService,private ele:ElementRef,private router: Router){}
  ngOnInit(): void {
    this.toggleUser(true);
  }
  toggleUser(isStudent:boolean){
    this.isStudent=isStudent;
    let studentBtn=this.ele.nativeElement.querySelector(".studentBtn");
    studentBtn.classList.toggle('btn-primary', isStudent);
    let staffBtn=this.ele.nativeElement.querySelector(".staffBtn");
    staffBtn.classList.toggle('btn-primary', !isStudent);
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
  regStaff(form:any){
    if(form.any){
      console.log('Form submitted:', form.value);
    }else{

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
  registerStaff(){
    // if(this.secret!=123456){
    //   return;
    // }
    this.student.user.role="STAFF";
    console.log(this.student);
    this.onRegister();
  }
  onRegister() {
    console.log('Starting Registration');
    this.auth.register(this.student).pipe(first()).subscribe(
      (data: any) => {
        console.log('Successful Response:', data);
        this.jsonData = data;
        this.router.navigate(['/verify/'+data.email]);
      },
      (err: any) => {
        console.error('Error During Registration:', err);
        this.errorMessage = err.message;
      }
    );
  }
}

