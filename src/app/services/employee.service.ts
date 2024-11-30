import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee/employee';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  getAllEmployees(endpoint: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/${endpoint}`);
  }
}
