import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./components/employee/employee').then(m => m.EmployeeComponent)        
    },
    {
        path:'spinner',
        loadComponent: () => import('./components/spinner/spinner').then(m => m.Spinner)
    }
];
