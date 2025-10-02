import { Routes } from '@angular/router';
import { PrincipalPageComponent } from './pages/principal/principal-page.component';
import { ArticulosPageComponent } from './pages/articulos/articulos-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [

{
  path:'',
  component: PrincipalPageComponent,
},

{
  path:'articulos',
  component: ArticulosPageComponent,
},
{
  path:'login',
  component: LoginPageComponent,
},
{
  path:'contacto',
  component: Contacto
}



];
