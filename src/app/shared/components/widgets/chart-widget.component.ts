import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-widget">
      <div class="chart-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="chart-content">
        <div class="chart-container" *ngIf="type === 'bar'">
          <div class="bar-chart">
            <div 
              *ngFor="let item of chartData; let i = index" 
              class="bar-item">
              <div 
                class="bar" 
                [style.height.%]="getBarHeight(item.value)"
                [style.background-color]="getBarColor(i)">
              </div>
              <span class="bar-label">{{ item.label }}</span>
              <span class="bar-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
        
        <div class="chart-container" *ngIf="type === 'doughnut'">
          <div class="doughnut-chart">
            <div class="doughnut-center">
              <span class="total">{{ getTotalValue() }}</span>
              <span class="label">Total</span>
            </div>
            <div class="doughnut-legend">
              <div 
                *ngFor="let item of chartData; let i = index" 
                class="legend-item">
                <div 
                  class="legend-color" 
                  [style.background-color]="getBarColor(i)">
                </div>
                <span>{{ item.label }}: {{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-container" *ngIf="type === 'line'">
          <div class="line-chart">
            <div class="line-grid">
              <div 
                *ngFor="let item of chartData; let i = index" 
                class="line-point"
                [style.height.%]="getBarHeight(item.value)"
                [style.left.%]="(i / (chartData.length - 1)) * 100">
                <div class="point"></div>
                <span class="point-label">{{ item.label }}</span>
                <span class="point-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-widget {
      background: var(--color-surface);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: 100%;
    }
    
    .chart-header {
      margin-bottom: 1.5rem;
      
      h3 {
        color: var(--color-text);
        margin: 0;
        font-size: 1.1rem;
      }
    }
    
    .chart-content {
      height: 250px;
    }
    
    .bar-chart {
      display: flex;
      align-items: end;
      height: 100%;
      gap: 1rem;
      padding: 1rem 0;
    }
    
    .bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    
    .bar {
      width: 100%;
      min-height: 10px;
      border-radius: 4px 4px 0 0;
      transition: all 0.3s ease;
      
      &:hover {
        opacity: 0.8;
      }
    }
    
    .bar-label {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      margin-top: 0.5rem;
    }
    
    .bar-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-text);
      margin-top: 0.25rem;
    }
    
    .doughnut-chart {
      display: flex;
      align-items: center;
      gap: 2rem;
      height: 100%;
    }
    
    .doughnut-center {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 20px solid var(--color-border-light);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      
      .total {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text);
      }
      
      .label {
        font-size: 0.8rem;
        color: var(--color-text-secondary);
      }
    }
    
    .doughnut-legend {
      flex: 1;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
    }
    
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    
    .line-chart {
      height: 100%;
      position: relative;
    }
    
    .line-grid {
      height: 100%;
      position: relative;
      border-bottom: 1px solid var(--color-border);
    }
    
    .line-point {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translateX(-50%);
    }
    
    .point {
      width: 8px;
      height: 8px;
      background: var(--color-primary);
      border-radius: 50%;
      margin-bottom: 0.5rem;
    }
    
    .point-label {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
    }
    
    .point-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-text);
      margin-top: 0.25rem;
    }
  `]
})
export class ChartWidgetComponent implements OnInit {
  @Input() title: string = '';
  @Input() type: 'bar' | 'doughnut' | 'line' = 'bar';
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  
  chartData: { label: string; value: number }[] = [];
  maxValue = 0;
  
  ngOnInit() {
    this.chartData = this.labels.map((label, index) => ({
      label,
      value: this.data[index] || 0
    }));
    this.maxValue = Math.max(...this.data);
  }
  
  getBarHeight(value: number): number {
    return this.maxValue > 0 ? (value / this.maxValue) * 100 : 0;
  }
  
  getBarColor(index: number): string {
    const colors = [
      'var(--color-primary)',
      'var(--color-accent)',
      'var(--color-success)',
      'var(--color-warning)',
      'var(--color-error)'
    ];
    return colors[index % colors.length];
  }
  
  getTotalValue(): number {
    return this.data.reduce((sum, value) => sum + value, 0);
  }
}