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
      nombre: ['', Validators.required,],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.loading = true;
    this.message = '';
    const { nombre, apellido, email, password, direccion, telefono } = this.registerForm.value;
    // Añadir los datos directamente a la tabla clientes
    const { error } = await this.supabase.addCliente(
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono
    );
    if (error) {
      const msg = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : JSON.stringify(error);
      this.message = 'Error al guardar datos del cliente: ' + msg;
    } else {
      this.message = 'Cliente añadido correctamente.';
      this.registerForm.reset();
    }
    this.loading = false;
  }

}

