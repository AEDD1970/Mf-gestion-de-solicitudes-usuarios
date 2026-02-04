import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toasts" 
        class="toast"
        [class]="'toast-' + toast.type"
        (click)="removeToast(toast.id)">
        <div class="toast-content">
          <span class="toast-icon">{{ getIcon(toast.type) }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button class="toast-close" (click)="removeToast(toast.id)">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .toast {
      min-width: 300px;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .toast-success {
      background: var(--color-success);
      color: var(--color-surface);
    }
    
    .toast-error {
      background: var(--color-error);
      color: var(--color-surface);
    }
    
    .toast-warning {
      background: var(--color-warning);
      color: var(--color-surface);
    }
    
    .toast-info {
      background: var(--color-primary);
      color: var(--color-surface);
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .toast-icon {
      font-size: 1.2rem;
    }
    
    .toast-message {
      font-weight: 500;
    }
    
    .toast-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
    
    @media (max-width: 480px) {
      .toast-container {
        left: 1rem;
        right: 1rem;
      }
      
      .toast {
        min-width: auto;
      }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(id: string): void {
    this.toastService.removeToast(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  }
}