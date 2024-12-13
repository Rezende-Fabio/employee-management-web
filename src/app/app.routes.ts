import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateUpdateEmployeeComponent } from './pages/create-update-employee/create-update-employee.component';

export const routes: Routes = [
    { path: "", component: IndexComponent },
    { path: "index", component: IndexComponent },
    { path: "home", component: HomeComponent },
    { path: "employee/create", component: CreateUpdateEmployeeComponent, data: { title: 'Inserir Funcionário' }},
    { path: "employee/update/:id", component: CreateUpdateEmployeeComponent, data: { title: 'Editar Funcionário' }}
];
