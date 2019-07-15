import { EditDepComponent } from './../edit-dep/edit-dep.component';
import { AddDepComponent } from './../add-dep/add-dep.component';
import { Department } from './../../models/department-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource,MatSort, MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:DepartmentService,private dialog:MatDialog,private snackbar:MatSnackBar) { 
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDepList();
    })
  }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options','DepartmentID', 'DepartmentName'];
  
  @ViewChild(MatSort,null) sort: MatSort;

  ngOnInit() {
    this.refreshDepList();
  }
  refreshDepList(){
    this.service.getDepList().subscribe(data =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    })
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }
  onEdit(dep: Department){
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="70%";
    this.dialog.open(EditDepComponent,dialogConfig);
  }
  onDelete(id:number){
    if(confirm('Are you sure to delete?')){
      this.service.deleteDep(id).subscribe(res=>{
        this.refreshDepList();
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
    this.dialog.open(AddDepComponent,dialogConfig);
  }
}
