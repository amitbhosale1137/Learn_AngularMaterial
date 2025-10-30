import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignalService } from '../../services/signal.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav';

@Component({
  selector: 'app-signal-demo',
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  templateUrl: './signal-demo.html',
  styleUrl: './signal-demo.scss',
})
export class SignalDemo {
  userService = inject(SignalService);
  fb = inject(FormBuilder);

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
