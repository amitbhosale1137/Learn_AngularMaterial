import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ColumnDef {
  key: string;
  label: string;
}

@Component({
  selector: 'app-reusable-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './reusable-table.html',
  styleUrl: './reusable-table.scss'
})
export class ReusableTableComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columnDefs: ColumnDef[] = [];
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() hasActions: boolean = false;

  @Output() editAction = new EventEmitter<any>();
  @Output() deleteAction = new EventEmitter<any>();

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
    
    // Add actions column if enabled
    if (this.hasActions) {
      this.displayedColumns.push('actions');
    }
    
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

  onEdit(element: any): void {
    this.editAction.emit(element);
  }

  onDelete(id: number): void {
    this.deleteAction.emit(id);
  }

  getColumnLabel(key: string): string {
    return this.columnDefs.find(col => col.key === key)?.label || key;
  }
}