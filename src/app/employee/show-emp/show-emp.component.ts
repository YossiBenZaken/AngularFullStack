import { AddEmpComponent } from './../add-emp/add-emp.component';
import { EditEmpComponent } from './../edit-emp/edit-emp.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort, MatDialogConfig } from '@angular/material';
import { Employee } from 'src/app/models/exployee-model';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:EmployeeService,private dialog:MatDialog,private snackbar:MatSnackBar) { 
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshEmpList();
    })
  }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options','EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];
  
  @ViewChild(MatSort,null) sort: MatSort;

  ngOnInit() {
    this.refreshEmpList();
  }
  refreshEmpList(){
    this.service.getEmpList().subscribe(data =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    })
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }
  onEdit(dep: Employee){
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="70%";
    this.dialog.open(EditEmpComponent,dialogConfig);
  }
  onDelete(id:number){
    if(confirm('Are you sure to delete?')){
      this.service.deleteEmp(id).subscribe(res=>{
        this.refreshEmpList();
        this.snackbar.open(res.toString(),'',{
          duration:5000,
          verticalPosition: 'top'
        })
      })
    }
  }
  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="70%";
    this.dialog.open(AddEmpComponent,dialogConfig);
  }

}
