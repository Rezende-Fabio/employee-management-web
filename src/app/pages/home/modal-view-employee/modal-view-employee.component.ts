import { Component, Inject } from '@angular/core';
import { Employee } from '../../../models/employee/employee';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-view-employee',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './modal-view-employee.component.html',
  styleUrl: './modal-view-employee.component.css'
})
export class ModalViewEmployeeComponent {
  employee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<ModalViewEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee, 
  ) {
    this.employee = data
  }

  closeModal() {
    this.dialogRef.close();
  }
}
