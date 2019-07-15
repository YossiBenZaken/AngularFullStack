import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {
  constructor(public dialogBox: MatDialogRef<EditEmpComponent>,private service:EmployeeService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.dropdownRefresh();
  }
  public listItems:Array<string> = [];
  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      });
    })
  }
  onClose(){
    this.dialogBox.close();
    this.service.filter('Register click');
  }
  onSubmit(form:NgForm){
    this.service.updateEmp(form.value).subscribe(res=>{
      this.snackbar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      })
    })
  }

}
