import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login.component';
import { UserListComponent } from './features/users/components/user-list.component';
import { DashboardComponent } from './features/dashboard/components/dashboard.component';
import { UserRequestsComponent } from './features/user-requests/components/user-requests.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user-requests', component: UserRequestsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
