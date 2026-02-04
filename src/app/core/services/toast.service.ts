import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  showSuccess(message: string): void {
    this.addToast(message, 'success');
  }

  showError(message: string): void {
    this.addToast(message, 'error');
  }

  showWarning(message: string): void {
    this.addToast(message, 'warning');
  }

  showInfo(message: string): void {
    this.addToast(message, 'info');
  }

  private addToast(message: string, type: Toast['type']): void {
    const toast: Toast = {
      id: Date.now().toString(),
      message,
      type
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    setTimeout(() => {
      this.removeToast(toast.id);
    }, 5000);
  }

  removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const filteredToasts = currentToasts.filter(toast => toast.id !== id);
    this.toastsSubject.next(filteredToasts);
  }
}