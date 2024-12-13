import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../../models/employee/employee';
import { EmployeeService } from '../../../services/employee.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-modal-delete-employee',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  templateUrl: './modal-delete-employee.component.html',
  styleUrl: './modal-delete-employee.component.css'
})
export class ModalDeleteEmployeeComponent {
  employee!: Employee;

  constructor(
    private apiService: EmployeeService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ModalDeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
  ) {
    this.employee = data
  }

  deleteEmployee() {
    this.apiService.deleteEmployee(`v1/employees`, this.employee.id).subscribe({
      next: (response: Employee) => {
        this.alertService.showAlert(`O funcionário ${response.nomeCompleto} foi excluído com sucesso!`, 'success');
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Erro ao atualizar o funcionário', error);
      },
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
