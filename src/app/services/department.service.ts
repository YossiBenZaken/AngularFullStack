import { Department } from './../models/department-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
  formData: Department;
  readonly APIUrl = "http://localhost:44367/api";
  getDepList():Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl + '/department');
  }
  addDep(dep:Department){
    return this.http.post(this.APIUrl+'/department',dep);
  }
  deleteDep(id:number){
    return this.http.delete(this.APIUrl+'/department/'+id);
  }
  updateDep(dep:Department){
    return this.http.put(this.APIUrl+'/department',dep);
  }
  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
}
