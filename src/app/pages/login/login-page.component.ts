import { ChangeDetectionStrategy,Component,signal } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
@Component({

templateUrl:`./login-page.component.html`,
imports:[ReactiveFormsModule],


})

export class LoginPageComponent {


  usuarioRegistrado = signal<{ nombre: string; email: string; password: string } | null>(null);

 constructor(private fb: FormBuilder) {}

  
}

