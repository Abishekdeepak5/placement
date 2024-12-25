export class Student{
    name:string='';
    email:string='';
    registerNumber:string='';
    rollNumber:string='';
    phone:string='';
    password:string='';
    department:string='';
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
  