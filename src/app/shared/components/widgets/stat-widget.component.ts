import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-widget" [class]="colorClass" [class.clickable]="clickable" (click)="onClick()">
      <div class="stat-icon">
        <span class="icon">{{ icon }}</span>
      </div>
      <div class="stat-content">
        <h3>{{ value }}</h3>
        <p>{{ label }}</p>
        <div class="stat-legend" *ngIf="legend">
          <small>{{ legend }}</small>
        </div>
        <div class="stat-change" *ngIf="change" [class.positive]="change > 0" [class.negative]="change < 0">
          <span>{{ change > 0 ? '+' : '' }}{{ change }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-widget {
      background: var(--color-surface);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--color-primary);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
      
      &.clickable {
        cursor: pointer;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
      }
      
      &.primary { border-left-color: var(--color-primary); }
      &.accent { border-left-color: var(--color-accent); }
      &.success { border-left-color: var(--color-success); }
      &.warning { border-left-color: var(--color-warning); }
    }
    
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--color-border-light);
      display: flex;
      align-items: center;
      justify-content: center;
      
      .icon {
        font-size: 1.5rem;
      }
    }
    
    .stat-content {
      flex: 1;
      
      h3 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-text);
        margin: 0;
      }
      
      p {
        color: var(--color-text-secondary);
        margin: 0.25rem 0;
        font-size: 0.9rem;
      }
      
      .stat-legend {
        margin-top: 0.25rem;
        
        small {
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          font-style: italic;
        }
      }
    }
    
    .stat-change {
      font-size: 0.8rem;
      font-weight: 600;
      
      &.positive { color: var(--color-success); }
      &.negative { color: var(--color-error); }
    }
  `]
})
export class StatWidgetComponent {
  @Input() value: string | number = '';
  @Input() label: string = '';
  @Input() icon: string = '📊';
  @Input() legend?: string;
  @Input() change?: number;
  @Input() colorClass: string = 'primary';
  @Input() clickable: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (this.clickable) {
      this.clicked.emit();
    }
  }
}