export class Drive{
    companyId:number=0;
    id:number=0;
    jobTitle:string='';
    description:string='';
    companyLocation:string='';
    date:any=new Date();
    ctc:number=0;
    driveLocation:string='';
    historyOfAllowed:any=false;
    eligibleCgpa:number=0;
    registrationClosingDate:any=new Date();
    count:number=0;
}
export class DriveResponse{
    drive:Drive=new Drive();
    registered:any=false;
    companyName:string='';
}