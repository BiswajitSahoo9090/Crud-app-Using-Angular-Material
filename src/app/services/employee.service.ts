import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(data: any): Observable<any> {
    const url = 'http://localhost:3000/employee'; 
    return this._http.post<any>(url, data);
  }
  updateEmployee(id:number,data: any): Observable<any> {
    const url = `http://localhost:3000/employee/${id}`; 
    return this._http.put<any>(url, data);
  }

  getEmployeeList(): Observable<any> {
    const url = 'http://localhost:3000/employee'; 
    return this._http.get<any>(url);
  }
  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  }
}
