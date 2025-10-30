// user.service.ts
import { Injectable, signal, linkedSignal, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private http = inject(HttpClient);

  // 🌱 State signals
  users = signal<any[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  refreshTrigger = signal(0);

  // 🧩 Derived API URL (reactive)
  apiUrl = linkedSignal({
    source: this.refreshTrigger,
    computation: () => `http://localhost:3000/users`,
  });

  constructor() {
    // ⚡ Effect — runs when apiUrl changes
    effect(() => {
      const url = this.apiUrl();
      this.fetchUsers(url);
      this.refreshTrigger();
    });
  }

  // 🔁 READ
  private fetchUsers(url: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to fetch users');
        this.isLoading.set(false);
      },
    });
  }

  // ➕ CREATE
  createUser(user: any) {
    this.http.post(`http://localhost:3000/users`, user).subscribe({
      next: (res) => {
        console.log('Created user:', res);
        this.refreshTrigger.update((v) => v + 1); // refresh list
      },
      error: () => this.error.set('Failed to create user'),
    });
  }

  // ✏️ UPDATE
  updateUser(id: number, user: any) {
    this.http.put(`http://localhost:3000/users/${id}`, user).subscribe({
      next: (res) => {
        console.log('Updated user:', res);
        this.refreshTrigger.update((v) => v + 1);
      },
      error: () => this.error.set('Failed to update user'),
    });
  }

  // 🗑 DELETE
  deleteUser(id: number) {
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe({
      next: () => {
        console.log('Deleted user:', id);
        this.refreshTrigger.update((v) => v + 1);
      },
      error: () => this.error.set('Failed to delete user'),
    });
  }

  // 🔄 Manual refresh
  reload() {
    this.refreshTrigger.update((v) => v + 1);
  }
}
