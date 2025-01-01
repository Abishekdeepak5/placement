import { Base } from "./base.model";

export class Student extends Base{
    name:string='';
    registerNumber:string='';
    rollNumber:string='';
    phone:string='';
    password:string='';
    department:string='CSE';
    batch:number=0;
    gender:string='';
    dateOfBirth:Date=new Date();
    hosteler:boolean=true;
}
export interface Product {
    name: string;
    data: {
      year: number;
      price: number;
      CPUModel: string;
      hardDiskSize: string;
    };
  }
  
export class LoginModel{
  registerNumber:string='';
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
    historyOfArrear:boolean=false;
}
