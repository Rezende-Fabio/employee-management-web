import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee/employee';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  
  constructor(private apiService: EmployeeService) {}

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
} 
