import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService, DashboardStats, ChartData } from '../../../core/services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { StatWidgetComponent } from '../../../shared/components/widgets/stat-widget.component';
import { ChartWidgetComponent } from '../../../shared/components/widgets/chart-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatWidgetComponent, ChartWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  usersByRoleData: ChartData | null = null;
  userGrowthData: ChartData | null = null;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe(stats => {
      this.stats = stats;
    });

    this.dashboardService.getUsersByRoleChart().subscribe(data => {
      this.usersByRoleData = data;
    });

    this.dashboardService.getUserGrowthChart().subscribe(data => {
      this.userGrowthData = data;
    });
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToUserRequests(): void {
    this.router.navigate(['/user-requests']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}