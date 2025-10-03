

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
   cancelarEdicion() {
    this.articuloForm.reset();
    this.editandoId = null;
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

  async borrarArticulo(id: number) {
    if (!confirm('¿Seguro que quieres borrar este artículo?')) return;
    try {
      await this.supabaseService.deleteArticulo(id);
      await this.cargarArticulos();
    } catch (error) {
      console.error('Error al borrar artículo:', error);
    }
  }

  editarArticulo(art: any) {
    this.articuloForm.patchValue({
      nombre: art.nombre,
      caracteristicas: art.caracteristicas,
      precio: art.precio
    });
    this.editandoId = art.id;
  }

  async modificarArticulo() {
    if (this.articuloForm.invalid || !this.editandoId) return;
    const { nombre, caracteristicas, precio } = this.articuloForm.value;
    try {
      await this.supabaseService.updateArticulo(this.editandoId, nombre, caracteristicas, precio);
      await this.cargarArticulos();
      this.articuloForm.reset();
      this.editandoId = null;
    } catch (error) {
      console.error('Error al modificar artículo:', error);
    }
  }
  editandoId: number | null = null;
}



