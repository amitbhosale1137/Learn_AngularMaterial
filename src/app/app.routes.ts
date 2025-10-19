import { Employee } from './services/api.service';
import { Routes } from '@angular/router';
export const routes: Routes = [  
    {
        path:'',
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)        
    },
    {
        path:'employees',
        loadComponent: () => import('./components/employee/employee').then(m => m.EmployeeComponent)        
    },
];
