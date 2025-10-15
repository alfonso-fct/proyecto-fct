import { Component, OnInit,NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  imports:[CommonModule,ReactiveFormsModule],
  selector: 'app-form-producto',
  templateUrl: './Gestion_de_productos.component.html',
  styleUrls: ['./Gestion_de_productos.component.css'],
})
export class FormProductoComponent implements OnInit {
  productoForm: FormGroup;
  productos: any[] = [];
  imagenFile!: File | null;
  cargando = false;
  mensaje = '';
  editandoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: [''],
      idcategoria: [1, Validators.required],
    });
  }

  async ngOnInit() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    try {
      this.productos = await this.supabaseService.getProductos();
    } catch (error) {
      console.error(error);
    }
  }

  onFileSelected(event: any) {
    this.imagenFile = event.target.files[0];
  }

  async onSubmit() {
    if (this.productoForm.invalid) return;
    this.cargando = true;
    this.mensaje = '';

      try {
      let imagenUrl = this.productoForm.value.imagen || null;

      if (this.imagenFile) {
        imagenUrl = await this.supabaseService.subirImagen(this.imagenFile);
      }

      const producto = {
        ...this.productoForm.value,
        imagen: imagenUrl
      };

      if (this.editandoId) {
        await this.supabaseService.actualizarProducto(this.editandoId, producto);
        this.mensaje = '✏️ Producto actualizado correctamente';
      } else {
        await this.supabaseService.insertarProducto(producto);
        this.mensaje = '✅ Producto agregado correctamente';
      }

      this.productoForm.reset({ idcategoria: 1 }); // reset con valor por defecto
      this.imagenFile = null;
      this.editandoId = null;
      await this.cargarProductos();
    } catch (err) {
      console.error(err);
      this.mensaje = '❌ Error al guardar el producto';
    } finally {
      this.cargando = false;
    }
  }



  editarProducto(p: any) {
    this.productoForm.patchValue(p);
    this.editandoId = p.idproducto;
  }

  async eliminarProducto(idproducto: number) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await this.supabaseService.eliminarProducto(idproducto);
      await this.cargarProductos();
      this.mensaje = '🗑️ Producto eliminado';
    } catch (error) {
      console.error(error);
      this.mensaje = '❌ Error al eliminar el producto';
    }
  }
}
