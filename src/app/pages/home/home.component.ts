import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee/employee';
import { ButtonComponent } from "../../components/button/button.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, ButtonComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'department', 'shift', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ListEmployees: Employee[] = [];

  constructor(private apiService: EmployeeService) {
    this.dataSource = new MatTableDataSource<Employee>(this.ListEmployees);
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  ngAfterViewInit() {
    this.createPagination();
  }

  createPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllEmployees() {
    this.apiService.getAllEmployees('v1/employees').subscribe({
      next: (response: Employee[]) => {
        this.ListEmployees = response;

        this.dataSource = new MatTableDataSource<Employee>(this.ListEmployees);
        this.createPagination();
      },
      error: (error) => {
        console.error('Erro ao buscar funcionários:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
} 
