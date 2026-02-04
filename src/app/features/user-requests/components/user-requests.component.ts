import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface UserRequest {
  id: string;
  email: string;
  cedula: string;
  tipoDocumento: string;
  telefono: string;
  rol: string;
  fechaSolicitud: Date;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
}

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-requests-container">
      <header class="header">
        <div class="header-left">
          <button class="btn-back" (click)="goBack()">
            ← Volver
          </button>
          <h1>Solicitudes de Usuarios</h1>
        </div>
        <div class="header-actions">
          <button class="btn-primary" (click)="navigateToUsers()">
            👥 Gestionar Usuarios
          </button>
        </div>
      </header>

      <div class="table-container">
        <table class="requests-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Cédula</th>
              <th>Tipo Doc</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Fecha Solicitud</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let request of userRequests">
              <td>{{ request.email }}</td>
              <td>{{ request.cedula }}</td>
              <td>{{ request.tipoDocumento }}</td>
              <td>{{ request.telefono }}</td>
              <td>
                <span class="role-badge" [class]="'role-' + request.rol">
                  {{ request.rol }}
                </span>
              </td>
              <td>{{ request.fechaSolicitud | date:'dd/MM/yyyy' }}</td>
              <td>
                <span class="status-badge" [class]="'status-' + request.estado">
                  {{ request.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="empty-state" *ngIf="userRequests.length === 0">
          <p>No hay solicitudes pendientes</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-requests-container {
      padding: 1rem;
      max-width: 1400px;
      margin: 0 auto;
      min-height: 100vh;
      background: var(--color-background);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      background: var(--color-surface);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
      }

      h1 {
        color: var(--color-text);
        margin: 0;
        font-size: 1.5rem;
      }
    }

    .btn-back {
      padding: 0.5rem 1rem;
      background: var(--color-border);
      color: var(--color-text);
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--color-text-secondary);
        color: var(--color-surface);
      }
    }

    .btn-primary {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
      color: var(--color-surface);
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
      }
    }

    .table-container {
      background: var(--color-surface);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .requests-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--color-border);
      }

      th {
        background: var(--color-border-light);
        font-weight: 600;
        color: var(--color-text);
      }

      td {
        color: var(--color-text-secondary);
      }
    }

    .role-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;

      &.role-admin {
        background: #e3f2fd;
        color: #1976d2;
      }

      &.role-natural {
        background: #f3e5f5;
        color: #7b1fa2;
      }
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;

      &.status-pendiente {
        background: #fff3cd;
        color: #856404;
      }

      &.status-aprobada {
        background: #d4edda;
        color: #155724;
      }

      &.status-rechazada {
        background: #f8d7da;
        color: #721c24;
      }
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-approve, .btn-reject {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-approve {
      background: var(--color-success);
      color: white;

      &:hover {
        background: #16a085;
      }
    }

    .btn-reject {
      background: var(--color-error);
      color: white;

      &:hover {
        background: #c0392b;
      }
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--color-text-secondary);
      
      p {
        font-size: 1.1rem;
        margin: 0;
      }
    }
  `]
})
export class UserRequestsComponent implements OnInit {
  userRequests: UserRequest[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserRequests();
  }

  loadUserRequests(): void {
    // Datos mock - lista completa de solicitudes pendientes
    this.userRequests = [
      {
        id: '1',
        email: 'juan.perez@email.com',
        cedula: '12345678',
        tipoDocumento: 'CC',
        telefono: '3001234567',
        rol: 'natural',
        fechaSolicitud: new Date('2024-01-15'),
        estado: 'pendiente'
      },
      {
        id: '2',
        email: 'maria.garcia@email.com',
        cedula: '87654321',
        tipoDocumento: 'CE',
        telefono: '3007654321',
        rol: 'admin',
        fechaSolicitud: new Date('2024-01-14'),
        estado: 'pendiente'
      },
      {
        id: '3',
        email: 'carlos.rodriguez@email.com',
        cedula: '11223344',
        tipoDocumento: 'CC',
        telefono: '3009876543',
        rol: 'natural',
        fechaSolicitud: new Date('2024-01-13'),
        estado: 'pendiente'
      },
      {
        id: '4',
        email: 'ana.martinez@email.com',
        cedula: '55667788',
        tipoDocumento: 'TI',
        telefono: '3005551234',
        rol: 'natural',
        fechaSolicitud: new Date('2024-01-12'),
        estado: 'pendiente'
      },
      {
        id: '5',
        email: 'luis.fernandez@email.com',
        cedula: '99887766',
        tipoDocumento: 'PP',
        telefono: '3004443333',
        rol: 'admin',
        fechaSolicitud: new Date('2024-01-11'),
        estado: 'pendiente'
      }
    ];
  }

  approveRequest(request: UserRequest): void {
    request.estado = 'aprobada';
    console.log('Solicitud aprobada:', request);
    // Aquí conectarías con tu API para aprobar la solicitud
  }

  rejectRequest(request: UserRequest): void {
    request.estado = 'rechazada';
    console.log('Solicitud rechazada:', request);
    // Aquí conectarías con tu API para rechazar la solicitud
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}