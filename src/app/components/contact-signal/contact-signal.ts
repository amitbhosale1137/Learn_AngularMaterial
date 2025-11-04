import { Component, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { NavComponent } from '../nav/nav';

@Component({
  selector: 'app-contact-signal',
  imports: [NgStyle, NavComponent],
  templateUrl: './contact-signal.html',
  styleUrl: './contact-signal.scss',
})
export class ContactSignal {
  name = signal('');
  email = signal('');
  message = signal('');
  showSuccess = signal(false);

  isValid = computed(
    () => this.name().length > 2 && this.email().includes('@') && this.message().length > 5
  );

  constructor(private http: HttpClient) {}

  submitForm() {
    debugger;
    if (!this.isValid()) return;

    const payload = {
      name: this.name(),
      email: this.email(),
      message: this.message(),
    };

    this.http.post('http://localhost:3000/posts', payload).subscribe(() => {
      this.showSuccess.set(true);
      setTimeout(() => this.showSuccess.set(false), 3000); // Hide after 3s
      this.name.set('');
      this.email.set('');
      this.message.set('');
    });
  }
}
