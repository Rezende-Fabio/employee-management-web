import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee/employee';
import { ButtonComponent } from "../../components/button/button.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, ButtonComponent, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  dataSource: any;

  constructor(private apiService: EmployeeService) { }

  ngOnInit() {
    this.apiService.getAllEmployees('v1/employees').subscribe({
      next: (response) => {
        this.employees = response;
        console.log('Employees:', this.employees);
      },
      error: (error) => {
        console.error('Erro ao buscar funcionários:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
} 
