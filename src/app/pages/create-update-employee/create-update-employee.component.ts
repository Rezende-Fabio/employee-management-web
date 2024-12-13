import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee/employee';
import { AlertService } from '../../services/alert.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-update-employee',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, RouterModule, MatIconModule],
  templateUrl: './create-update-employee.component.html',
  styleUrl: './create-update-employee.component.css'
})
export class CreateUpdateEmployeeComponent {

  listShifts: string[] = [
    "INTEGRAL",
    "MANHA",
    "TARDE",
    "NOITE"
  ];
  listDepartments: string[] = [
    "RH",
    "TI",
    "COMPRAS",
    "ATENDIMENTO",
    "FINANCEIRO",
    "COMERCIAL",
    "PRODUCAO"
  ];
  messageAlert!: string;
  showAlert: boolean = false;
  titlePage!: string;
  formEmployee!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: EmployeeService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.titlePage = data['title'] || 'Formulário do Funcionário';
    });
    this.buildForm();

    const employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (employeeId) {
      this.getEmployeeById(employeeId);
    }
  }

  seveForm() {
    const employee: Employee = this.formEmployee.getRawValue();
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));

    if (employeeId) {
      // Atualização
      this.apiService.updateEmployee(`v1/employees`, employee, employeeId).subscribe({
        next: (response: Employee) => {
          this.alertService.showAlert(`O funcionário ${response.nomeCompleto} foi atualizado com sucesso!`, 'success');
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.openAlert('Erro ao atualizar o funcionário');
          console.error('Erro ao atualizar o funcionário', error);
        },
      });
    } else {
      // Inclusão
      this.apiService.createEmployee('v1/employees', employee).subscribe({
        next: (response: Employee) => {
          this.alertService.showAlert(`O funcionário ${response.nomeCompleto} foi incluído com sucesso!`, 'success');
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.openAlert('Erro ao incluir o funcionário');
          console.error('Erro ao incluir o funcionário', error);
        },
      });
    }
  }


  getEmployeeById(idEmployee: number) {
    this.apiService.getEmployeeById('v1/employees', idEmployee).subscribe({
      next: (response: Employee) => {
        this.formEmployee.patchValue(response);
      },
      error: (error) => {
        this.openAlert('Erro ao incluir o funcionário');
        console.error('Erro ao incluir o funcionário', error);
      },
    });
  }

  openAlert(message: string) {
    this.messageAlert = message;
    this.showAlert = true;
  }

  closeAlert() {
    this.showAlert = false;
  }

  buildForm() {
    this.formEmployee = this.formBuilder.group({
      nomeCompleto: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(65)]],
      departamento: ["", [Validators.required]],
      turno: ["", [Validators.required]]
    });
  }
}
