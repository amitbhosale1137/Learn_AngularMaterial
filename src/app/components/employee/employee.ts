import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class EmployeeComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['id', 'title', 'body'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.getUsers()

    // this.apiService.getData().subscribe(data => {

    //   .map(user => ({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email
    //   }));
    //   this.dataSource.data = data;
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  getUsers(){
    this.apiService.getData().subscribe({
      next:(res)=>{
        debugger;
        this.dataSource.data = res;
       this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      error(){
        alert('ssdsdsd')
      }
    })
  }
  

}