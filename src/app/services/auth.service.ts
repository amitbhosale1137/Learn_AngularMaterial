import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environment/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly tokenStorageKey = 'auth_token';
  private readonly storedToken = signal<string | null>(this.loadTokenFromStorage());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response?.token) {
          this.persistToken(response.token);
        }
      })
    );
  }

  logout(): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(this.tokenStorageKey);
    this.storedToken.set(null);
  }

  getToken(): string | null {
    return this.storedToken();
  }

  isAuthenticated(): boolean {
    return Boolean(this.storedToken());
  }

  private persistToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(this.tokenStorageKey, token);
    this.storedToken.set(token);
  }

  private loadTokenFromStorage(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const token = localStorage.getItem(this.tokenStorageKey);
    return token ? token : null;
  }
}