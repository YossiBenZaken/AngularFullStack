import { Department } from './../models/department-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Employee } from '../models/exployee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  formData: Employee;
  readonly APIUrl = "http://localhost:44367/api";
  getEmpList():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + '/employee');
  }
  addEmp(emp:Employee){
    return this.http.post(this.APIUrl+'/employee',emp);
  }
  deleteEmp(id:number){
    return this.http.delete(this.APIUrl+'/employee/'+id);
  }
  updateEmp(emp:Employee){
    return this.http.put(this.APIUrl+'/employee',emp);
  }
  getDepDropDownValues():Observable<any>{
    return this.http.get<Department[]>(this.APIUrl+'/department');
  }
  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
}
