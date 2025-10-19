import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

export interface ColumnDef {
  key: string;
  label: string;
}

@Component({
  selector: 'app-reusable-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './reusable-table.html',
  styleUrl: './reusable-table.scss'
})
export class ReusableTableComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columnDefs: ColumnDef[] = [];
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['columnDefs']) {
      this.updateTable();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateTable(): void {
    // Extract column keys from columnDefs
    this.displayedColumns = this.columnDefs.map(col => col.key);
    
    // Update data source
    this.dataSource.data = this.data;
    
    // Reconnect paginator and sort after data change
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  getColumnLabel(key: string): string {
    return this.columnDefs.find(col => col.key === key)?.label || key;
  }
}