import { Employee } from './services/api.service';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'employees',
    loadComponent: () => import('./components/employee/employee').then((m) => m.EmployeeComponent),
  },
  {
    path: 'signal',
    loadComponent: () => import('./components/signal-demo/signal-demo').then((m) => m.SignalDemo),
  },
  {
    path: 'contact-signal',
    loadComponent: () =>
      import('./components/contact-signal/contact-signal').then((m) => m.ContactSignal),
  },
  {
    path: 'multi-Lang',
    loadComponent: () => import('./components/mutli-lang/mutli-lang').then((m) => m.MutliLang),
  },
];
