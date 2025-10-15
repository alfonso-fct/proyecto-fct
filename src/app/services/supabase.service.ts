

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  signUp(email: string, password: string, name: string): { error: any; } | PromiseLike<{ error: any; }> {
    throw new Error("Method not implemented.");
  }
  private supabase: SupabaseClient;

  constructor() {
    // Aquí debes poner tu URL y API key de Supabase
    const supabaseUrl = 'https://ryajewgpwcpzwhunwury.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5YWpld2dwd2NwendodW53dXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDc4ODcsImV4cCI6MjA3NDM4Mzg4N30.D9ptsDn4gHTy326emWXJLGdRapWDODCHy6FZx8t0SoE';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getProductos() {
    const { data, error } = await this.supabase
      .from('producto')
      .select('*')
      .order('idproducto', { ascending: false });
    if (error) throw error;
    return data;
  }

  async insertarProducto(producto: any) {
    const { data, error } = await this.supabase
      .from('producto')
      .insert([producto]);
    if (error) throw error;
    return data;
  }

  async actualizarProducto(id: number, producto: any) {
    const { data, error } = await this.supabase
      .from('producto')
      .update(producto)
      .eq('idproducto', id);
    if (error) throw error;
    return data;
  }

  async eliminarProducto(id: number) {
    const { error } = await this.supabase
      .from('producto')
      .delete()
      .eq('idproducto', id);
    if (error) throw error;
  }

  async subirImagen(file: File) {
    const filePath = `producto/${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
      .from('imagen')
      .upload(filePath, file);

    if (error) throw error;

    const { data: urlData } = this.supabase.storage
      .from('imagen')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }



  // Método para añadir cliente
  async addCliente(nombre: string, apellido: string, email: string, password: string, direccion: string, telefono: string) {
    try {
      const { data, error } = await this.supabase
        .from('cliente')
        .insert([{ nombre: nombre,
    apellido: apellido,
    email: email,
    password: password,
    direccion: direccion,
    telefono: telefono }]);
      return { error, data };
    } catch (error) {
      return { error, data: null };
    }
  }


  // Método para autenticar cliente
   async loginCliente(email: string, password: string) {
  try {
    // Busca un registro que coincida con email y contraseña
    const { data, error } = await this.supabase
      .from('cliente')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      return { success: false, message: 'Error en la consulta: ' + error.message };
    }

    if (data) {
      return { success: true, message: 'Identificación correcta', cliente: data };
    } else {
      return { success: false, message: 'Correo o contraseña incorrectos' };
    }
  } catch (err) {
    return { success: false, message: 'Error inesperado: ' + (err as Error).message };
  }
}

}

