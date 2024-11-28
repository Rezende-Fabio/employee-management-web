import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: "", component: IndexComponent },
    { path: "index", component: IndexComponent },
    { path: "home", component: HomeComponent }
];
