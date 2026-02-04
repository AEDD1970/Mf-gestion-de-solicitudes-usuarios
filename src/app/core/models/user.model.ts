export interface User {
  id?: string | number;
  email: string;
  password?: string;
  cedula: string;
  tipoDocumento: 'CC' | 'CE' | 'TI' | 'PP';
  telefono: string;
  rol: 'admin' | 'natural';
  createdAt?: Date | string;
  isDeleted?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}