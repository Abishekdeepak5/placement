import { Base } from "./base.model";
import {UserModel} from "./user.model";
export class Student extends Base{
    isPlaced:any=false;
    registerNumber:string='';
    rollNumber:string='';
    batch:number=0;
    hosteler:boolean=true;
    user:UserModel=new UserModel();
}
 
export class LoginModel{
  email:string='';
  password:string='';
}

export class Mark{
    sslc:number=0;
    hsc1:number=0;
    hsc2:number=0;
    diploma:number=0;
    sem1:number=0;
    sem2:number=0;
    sem3:number=0;
    sem4:number=0;
    sem5:number=0;
    sem6:number=0;
    sem7:number=0;
    cgpa:number=0;
    currentBacklogs:number=0;
    historyOfArrear:any=false;
}


export class StudentDetail{
  registerNumber:string='';
  name:string='';
  department:string='CSE';
  email:string='';
  phone:string='';
  gender:string='';
  rollNumber:string='';
  sslc:number=0;
  hsc1:number=0;
  hsc2:number=0;
  cgpa:number=0;
  currentBacklogs:number=0;
  diploma:number=0;
  historyOfArrear:any=false;

  constructor(student:any){
    this.registerNumber=String(student.registerNumber);
    this.rollNumber=student.rollNumber;
    this.email=student.user.email;
    this.name=student.user.name;
    this.department=student.user.department;
    this.phone=student.user.phone;
    this.gender=student.user.gender;
    this.sslc=student.marks.sslc
    this.hsc1=student.marks.hsc1;
    this.hsc2=student.marks.hsc2;
    this.cgpa=student.marks.cgpa;
    this.currentBacklogs=student.marks.currentBacklogs;
    this.diploma=student.marks.diploma;
    this.historyOfArrear=student.marks.historyOfArrear;
  }

}