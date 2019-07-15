import { DepartmentService } from 'src/app/services/department.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(private dialogBox: MatDialogRef<AddDepComponent>,private service:DepartmentService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData ={
      DepartmentID:0,
      DepartmentName:''
    }
  }
  onClose(){
    this.dialogBox.close();
    this.service.filter('Register click')
  }
  onSubmit(form:NgForm){
    this.service.addDep(form.value).subscribe(res =>{
      this.resetForm(form);
      this.snackbar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      });
    })
  }
}
