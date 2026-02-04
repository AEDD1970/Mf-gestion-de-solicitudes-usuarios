import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ title }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" (click)="onCancel()">
            Atrás
          </button>
          <button class="btn-danger" (click)="onConfirm()">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      padding: 1rem;
    }
    
    .modal-content {
      background: var(--color-surface);
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .modal-header {
      padding: 1.5rem 1.5rem 0;
      
      h3 {
        margin: 0;
        color: var(--color-text);
        font-size: 1.2rem;
      }
    }
    
    .modal-body {
      padding: 1rem 1.5rem;
      
      p {
        margin: 0;
        color: var(--color-text-secondary);
        line-height: 1.5;
      }
    }
    
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 0 1.5rem 1.5rem;
    }
    
    .btn-secondary, .btn-danger {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }
    
    .btn-secondary {
      background: var(--color-text-secondary);
      color: var(--color-surface);
      
      &:hover {
        background: var(--color-text);
      }
    }
    
    .btn-danger {
      background: var(--color-error);
      color: var(--color-surface);
      
      &:hover {
        background: #DC2626;
      }
    }
    
    @media (max-width: 480px) {
      .modal-actions {
        flex-direction: column-reverse;
        
        .btn-secondary, .btn-danger {
          width: 100%;
        }
      }
    }
  `]
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Estás seguro?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}