import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { ConfirmationSnackComponent, ConfirmationSnackData } from '../Shared/confirmation-snack';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly defaultDuration = 3000;
  private snackBar = inject(MatSnackBar);

  showError(message: string, config?: MatSnackBarConfig): void {
    this.openSnackBar(message, {
      duration: this.defaultDuration,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['danger-snackbar'],
      ...config,
    });
  }

  showSuccess(message: string): void {
    this.openSnackBar(message, {
      duration: this.defaultDuration,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['success-snackbar'],
    });
  }

  showConfirmation(message: string, confirmText: string, cancelText: string): MatSnackBarRef<ConfirmationSnackComponent> {
    return this.snackBar.openFromComponent(ConfirmationSnackComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message,
        confirmText,
        cancelText,
      } satisfies ConfirmationSnackData,
      duration: undefined,
      panelClass: ['confirmation-snackbar'],
    });
  }

  private openSnackBar(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      ...config,
    });
  }
}