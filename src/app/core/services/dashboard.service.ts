import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  naturalUsers: number;
  newUsersThisMonth: number;
  pendingRequests: number;
}

export interface ChartData {
  labels: string[];
  data: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalUsers: 156,
      activeUsers: 142,
      adminUsers: 12,
      naturalUsers: 144,
      newUsersThisMonth: 23,
      pendingRequests: 5,
    };
    return of(stats);
  }

  getUsersByRoleChart(): Observable<ChartData> {
    const data: ChartData = {
      labels: ['Administradores', 'Usuarios Naturales'],
      data: [12, 144]
    };
    return of(data);
  }

  getUserGrowthChart(): Observable<ChartData> {
    const data: ChartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      data: [45, 52, 68, 84, 102, 156]
    };
    return of(data);
  }

  getActivityChart(): Observable<ChartData> {
    const data: ChartData = {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      data: [65, 78, 90, 81, 56, 45, 38]
    };
    return of(data);
  }
}