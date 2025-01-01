import { Component, OnInit } from '@angular/core';
import { Mark } from '../../../shared/models/student.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../shared/service/student.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-mark',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mark.component.html',
  styleUrl: './mark.component.css'
})
export class MarkComponent implements OnInit{
  marks:Mark=new Mark();
  constructor(private studentService:StudentService){}
  setMarks(){
    console.log(this.studentService.getHeader());
    console.log(this.marks);
    this.studentService.setMark(this.marks).pipe(first()).subscribe(
      (data:any)=>{ 
        console.log(data);
      },
      (err:any)=>{
        console.error('Error During Registration:', err);
      });
  }
  ngOnInit(): void {
    this.studentService.getMark().pipe(first()).subscribe(
      (data:any)=>{ 
        console.log(data);
        this.marks=data;
      },
      (err:any)=>{
        console.error('Error During Registration:', err);
      });
  }
}
