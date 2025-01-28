import { Base } from "./base.model";

export class UserModel extends Base{
    name:string='';
    override email:string='';
    password:string='';
    phone:string='';
    department:string='CSE';
    gender:string='';
    dateOfBirth:Date=new Date();
    role:string="STUDENT";
}