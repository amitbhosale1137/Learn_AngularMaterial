import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../services/api.service';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './employee-dialog.html',
  styleUrl: './employee-dialog.scss',
})
export class EmployeeDialogComponent {
  employeeForm: FormGroup;
  isEditMode = false;

  departments = [
    'Engineering',
    'Sales',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
    'Support',
    'Product',
  ];

  // locations = [
  //   'New York',
  //   'Los Angeles',
  //   'Chicago',
  //   'Houston',
  //   'Phoenix',
  //   'Philadelphia',
  //   'San Antonio',
  //   'San Diego',
  //   'Dallas',
  //   'San Jose',
  //   'Austin',
  //   'Seattle',
  //   'Denver',
  //   'Boston',
  //   'Miami',
  // ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, Validators.min(0)]],
      department: ['', Validators.required],
      // phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9-]{10,}$/)]],
      // location: ['', Validators.required],
    });

    if (data) {
      this.isEditMode = true;
      this.employeeForm.patchValue(data);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  getTitle(): string {
    return this.isEditMode ? 'Edit Employee' : 'Add New Employee';
  }
}