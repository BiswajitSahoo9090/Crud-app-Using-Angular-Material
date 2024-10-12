import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
empForm:FormGroup;

  education:string[]=[
    'Matric' ,
    'Intermediate',
    'Graduate',
    'Post-Graduate',
  ];

  constructor(
    private _fb:FormBuilder,
    private _empService:EmployeeService, 
    private _dialogref:MatDialogRef<EmpAddEditComponent>,//create service for close and open
    @Inject(MAT_DIALOG_DATA) public data:any, //recive data in dilog box //app.ts //for edit
    private _coreService:CoreService
  ){
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',

    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data); //patch value inside a form 26.@inject
  }
  onFormSubmit(){
    if(this.empForm.valid){
      // console.log(this.empForm.value);
      if(this.data){
        this._empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
          next: (val:any)=>{
    this._coreService.openSnackBar('Employee Detail Updated' ,'done');
    this._dialogref.close(true);  //this true comes from  43.if(val){ app.ts //when u pass true it will automatically refreshed
          },
          error:(err:any) =>{
            console.error(err);
          }
         });
        
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any)=>{
    this._coreService.openSnackBar('Employee Added Sucessfully' ,'done');
    this._dialogref.close(true);
          },
          error:(err:any) =>{
            console.error(err);
          }
         })
      }
     
     
    }
  }

}
