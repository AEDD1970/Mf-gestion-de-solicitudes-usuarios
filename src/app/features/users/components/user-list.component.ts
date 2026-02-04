import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Router } from '@angular/router';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  showCreateForm = false;
  currentUser: User | null = null;
  showDeleteModal = false;
  userToDelete: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.currentUser = this.authService.getCurrentUser();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        let users: User[];
        if (Array.isArray(response)) {
          users = response;
        } else if (response && (response as any).data && Array.isArray((response as any).data)) {
          users = (response as any).data;
        } else if (response && (response as any).users && Array.isArray((response as any).users)) {
          users = (response as any).users;
        } else {
          users = [];
        }
        
        this.users = users;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
        this.toastService.showError('Error al cargar usuarios');
      }
    });
  }

  onUserCreated(user: User): void {
    this.showCreateForm = false;
    this.loadUsers();
    this.toastService.showSuccess('Usuario creado con éxito');
  }

  openDeleteModal(user: User): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.userToDelete?.id) {
      this.userService.deleteUser(String(this.userToDelete.id)).subscribe({
        next: (response) => {
          console.log('Usuario eliminado, respuesta:', response);
          this.loadUsers();
          this.toastService.showSuccess('Usuario eliminado con éxito');
          this.cancelDelete();
        },
        error: (error) => {
          console.error('Error eliminando usuario:', error);
          // Si es status 200, tratar como éxito
          if (error.status === 200) {
            this.loadUsers();
            this.toastService.showSuccess('Usuario eliminado con éxito');
            this.cancelDelete();
          } else {
            this.toastService.showError('Error al eliminar usuario');
          }
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  deleteUser(id: string | number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(String(id)).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  trackByUserId(index: number, user: User): any {
    return user.id || index;
  }
}