import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  message = '';

  constructor(private fb: FormBuilder, private supabase: SupabaseService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    this.loading = true;
    this.message = '';

    const { email, password } = this.loginForm.value;
    const { success, message } = await this.supabase.loginCliente(email, password);

    this.message = message;
    this.loading = false;
  }
}
