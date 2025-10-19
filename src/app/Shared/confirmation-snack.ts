import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ConfirmationSnackData {
  message: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirmation-snack',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="confirmation-snack">
      <span class="message">{{ data.message }}</span>
      <div class="actions">
        <button mat-flat-button type="button" (click)="onCancel()">
          {{ data.cancelText }}
        </button>
        <button mat-flat-button type="button" (click)="onConfirm()">
          {{ data.confirmText }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .confirmation-snack {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .message {
        flex: 1 1 auto;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
      }
    `,
  ],
})
export class ConfirmationSnackComponent {
  constructor(
    private readonly snackBarRef: MatSnackBarRef<ConfirmationSnackComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public readonly data: ConfirmationSnackData
  ) {}

  onConfirm(): void {
    this.snackBarRef.dismissWithAction();
  }

  onCancel(): void {
    this.snackBarRef.dismiss();
  }
}