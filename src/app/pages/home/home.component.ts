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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalViewEmployeeComponent } from './modal-view-employee/modal-view-employee.component';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../interfaces/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, ButtonComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatDialogModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'department', 'shift', 'action'];
  dataSource: any;
  alert: Alert | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ListEmployees: Employee[] = [];

  constructor(
    private apiService: EmployeeService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Employee>(this.ListEmployees);
  }

  ngOnInit() {
    this.checkAlert();
    this.getAllEmployees();
  }

  ngAfterViewInit() {
    this.createPagination();
  }

  createPagination() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkAlert() {
    this.alertService.alert$.subscribe((alert) => {
      this.alert = alert;

      if (alert) {
        setTimeout(() => {
          this.alertService.clearAlert();
        }, 10000);
      }
    });
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

  getAlertClass(type: 'success' | 'error' | 'warning' | 'info'): string {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return '';
    }
  }

  getAlertIcon(type: 'success' | 'error' | 'warning' | 'info'): string {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'cancel';
      case 'warning':
        return 'error';
      case 'info':
        return 'info';
      default:
        return '';
    }
  }

  //Logicas Modal
  openModalViewEmployee(employee: Employee, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ModalViewEmployeeComponent, {
      height: "230px",
      width: '900px',
      data: employee,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
} 
