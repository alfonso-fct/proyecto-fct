import { ChangeDetectionStrategy,Component,signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SupabaseService } from "../../services/supabase.service";
import { CommonModule } from "@angular/common";










@Component({

templateUrl:`./login-page.component.html`,
imports:[ReactiveFormsModule,CommonModule],
 standalone: true,


})

export class RegistroUsuarioPageComponent {
  registerForm: FormGroup;
 loading = false;
  message = '';

   constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService
  ) {



  this.registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });}

  async onSubmit() {
    this.loading = true;
    this.message = '';

    const { name, email, password } = this.registerForm.value;

    if (email && password && name) {
      const { error } = await this.supabase.addUsuarios(email, password, name);

      if (error) {
        this.message = 'Error: ' + error.message;
      } else {
        this.message = 'Registro exitoso. Revisa tu correo para confirmar tu cuenta.';
      }
    }

    this.loading = false;
  }

}

