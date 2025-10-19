import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReusableTableComponent, ColumnDef } from '../../Shared/reusable-table/reusable-table';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, MatCardModule, ReusableTableComponent],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class EmployeeComponent implements OnInit {
  tableData: any[] = [];

  columnDefs: ColumnDef[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'salary', label: 'Salary' },
    { key: 'phone', label: 'Phone' },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
  ];
  
  apiService = inject(ApiService);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getData().subscribe({
      next: (res) => {
        this.tableData = res;
        this.showSuccess('Data loaded Successfully !!!');
      },
      error: (err) => {
        this.showError('Error while loading Api');
      },
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['danger-snackbar'],
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000,
      panelClass: ['success-snackbar'],
    });
  }
}
