import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService, Employee } from '../../services/api.service';

import { ReusableTableComponent, ColumnDef } from '../../Shared/reusable-table/reusable-table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../../Shared/employee-dialog/employee-dialog';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    MatCardModule,
    ReusableTableComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class EmployeeComponent implements OnInit {
  tableData: any[] = [];

  columnDefs: ColumnDef[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'salary', label: 'Salary' },
    { key: 'department', label: 'Department' },
  ];

  apiService = inject(ApiService);
  notificationService = inject(NotificationService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.apiService.getData().subscribe({
      next: (res) => {
        this.tableData = res;
        this.notificationService.showSuccess('Employee loaded successfully!');
      },
      error: () => {
        this.notificationService.showError('Error while loading Api');
      },
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createEmployee(result);
      }
    });
  }

  createEmployee(employee: Employee): void {
    this.apiService.createEmployee(employee).subscribe({
      next: () => {
        this.notificationService.showSuccess('Employee created successfully!');
        this.loadEmployees();
      },
      error: () => {
        this.notificationService.showError('Error creating employee');
      },
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && employee.id) {
        this.updateEmployee(employee.id, result);
      }
    });
  }

  updateEmployee(id: string, employee: Employee): void {
    this.apiService.updateEmployee(id, employee).subscribe({
      next: () => {
        this.notificationService.showSuccess('Employee updated successfully!');
        this.loadEmployees();
      },
      error: () => {
        this.notificationService.showError('Error updating employee');
      },
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apiService.deleteEmployee(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Employee deleted successfully!');
          this.loadEmployees();
        },
        error: () => {
          this.notificationService.showError('Error deleting employee');
        },
      });
    }
  }


}
