import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class EmployeeComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['id', 'title', 'body'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getData().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSuccess("Data loaded Successfully !!!");
      },
      error: (err) => {
        this.showError("Error while loading Api");
      },
    });
  }

  showError(message: string): void {
    this.snackBar.open(message,'X',{
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass: ['danger-snackbar']
    })
    
  }

  showSuccess(message: string): void {
    this.snackBar.open(message,'X',{
      horizontalPosition:'center',
      verticalPosition: 'top',
      duration:1000,
      panelClass: ['success-snackbar']
    })
    
  }
}
