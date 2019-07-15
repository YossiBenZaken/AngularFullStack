import { DepartmentService } from 'src/app/services/department.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<EditDepComponent>,private service:DepartmentService,private snackbar:MatSnackBar) { }

  ngOnInit() {
  }
  onClose(){
    this.dialogBox.close();
    this.service.filter('Register click');
  }
  onSubmit(form:NgForm){
    this.service.updateDep(form.value).subscribe(res=>{
      this.snackbar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      })
    })
  }
}
