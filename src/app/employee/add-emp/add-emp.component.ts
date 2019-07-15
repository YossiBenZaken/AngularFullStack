import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(private dialogBox: MatDialogRef<AddEmpComponent>,private service:EmployeeService,private snackbar:MatSnackBar) { }
  public listItems:Array<string> = [];
  ngOnInit() {
    this.resetForm();
    this.dropdownRefresh();
  }
  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      });
    })
  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData ={
      EmployeeID:0,
      EmployeeName:'',
      Department:'',
      MailID:'',
      DOJ:null
    }
  }
  onClose(){
    this.dialogBox.close();
    this.service.filter('Register click')
  }
  onSubmit(form:NgForm){
    this.service.addEmp(form.value).subscribe(res =>{
      this.resetForm(form);
      this.snackbar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      });
    })
  }

}
