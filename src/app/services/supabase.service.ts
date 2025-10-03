
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

  // Método para obtener artículos
  async getArticulos() {
    const { data, error } = await this.supabase
      .from('articulos')
      .select('*');
    if (error) throw error;
    return data;
  }

  // Método para insertar un artículo
  async addArticulo(nombre: string, caracteristicas: string, precio: number) {
    const { data, error } = await this.supabase
      .from('articulos')
      .insert([{ nombre: nombre, caracteristicas: caracteristicas, precio: precio }]);
    if (error) throw error;
    return data;
  }

//Metodos para el registro de usuarios
  async getUsuarios() {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*');
    if (error) throw error;
    return data;
  }

  // Método para añadir usuario
 async addUsuarios(email: string, password: string, name: string) {
  const { data, error } = await this.supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name } // metadata del usuario
    }
  });

  return { data, error };
}
}

