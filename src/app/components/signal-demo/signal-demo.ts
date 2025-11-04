import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignalService } from '../../services/signal.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav';
import { ColumnDef, ReusableTableComponent } from '../../Shared/reusable-table/reusable-table';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationService } from '../../services/notification.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-signal-demo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavComponent,
    ReusableTableComponent,
    MatButtonModule,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './signal-demo.html',
  styleUrl: './signal-demo.scss',
})
export class SignalDemo {
  tableData: any[] = [];
  private _users: User[] = [];

  columnDefs: ColumnDef[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  users(): User[] {
    return this._users || [];
  }

  userService = inject(SignalService);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  notificationService = inject(NotificationService);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  selectedUserId: number | null = null;

  // ✏️ Fill form for editing
  editUser(user: any) {
    this.selectedUserId = user.id;
    this.form.patchValue(user);
  }

  // 💾 Create or Update
  saveUser() {
    const user = this.form.value;
    if (this.selectedUserId) {
      this.userService.updateUser(this.selectedUserId, user);
    } else {
      this.userService.createUser(user);
    }
    this.resetForm();
    this.notificationService.showSuccess('User created successfully!');
  }

  // 🗑 Delete
  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  // 🔄 Reset form
  resetForm() {
    this.form.reset();
    this.selectedUserId = null;
  }
}
