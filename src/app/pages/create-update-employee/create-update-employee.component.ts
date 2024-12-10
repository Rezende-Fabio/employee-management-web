import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee/employee';

@Component({
  selector: 'app-create-update-employee',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, RouterModule],
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
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.titlePage = data['title'] || 'Formulário do Funcionário';
    });
    this.buildForm();
  }

  seveForm(){
    const employee: Employee = this.formEmployee.getRawValue();
    this.apiService.createEmployee('v1/employees', employee).subscribe({
      next: (response: Employee) => {
        this.router.navigate(["home"]);
      },  
      error: (error) => {
        this.openAlert('Erro ao incluir o funcionário');
        console.error('Erro ao incluir o funcionário', error);
      },
    });
  }

  openAlert(message: string){
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
