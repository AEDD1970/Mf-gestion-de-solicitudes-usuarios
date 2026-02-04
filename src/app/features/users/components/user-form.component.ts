import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Output() userCreated = new EventEmitter<User>();
  @Output() cancelled = new EventEmitter<void>();

  userForm: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cedula: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('Usuario creado, respuesta:', response);
          this.loading = false;
          this.userCreated.emit(this.userForm.value);
        },
        error: (error) => {
          console.error('Error creando usuario:', error);
          
          // Si el status es 200, tratar como éxito
          if (error.status === 200) {
            console.log('Status 200 detectado, procesando como éxito');
            this.loading = false;
            this.userCreated.emit(this.userForm.value);
          } else {
            this.loading = false;
          }
        }
      });
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}