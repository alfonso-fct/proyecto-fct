
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({

  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './articulos-page.component.html'
})
export class ArticulosPageComponent implements OnInit {
  articulos: any[] = [];
  articuloForm: FormGroup;

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder
  ) {
    // Crear formulario reactivo
    this.articuloForm = this.fb.group({
      nombre: ['', Validators.required],
      caracteristicas: [''],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    await this.cargarArticulos();
  }

  async cargarArticulos() {
    try {
      this.articulos = await this.supabaseService.getArticulos();
    } catch (error) {
      console.error('Error al cargar artículos:', error);
    }
  }

  async agregarArticulo() {
    if (this.articuloForm.invalid) return;

    const { nombre, caracteristicas, precio } = this.articuloForm.value;

    try {
      await this.supabaseService.addArticulo(nombre, caracteristicas, precio);
      await this.cargarArticulos(); // refrescar lista
      this.articuloForm.reset(); // limpiar formulario
    } catch (error) {
      console.error('Error al agregar artículo:', error);
    }
  }
}



