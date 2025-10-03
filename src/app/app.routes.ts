import { Routes } from '@angular/router';
import { PrincipalPageComponent } from './pages/principal/principal-page.component';
import { ArticulosPageComponent } from './pages/articulos/articulos-page.component';
import { RegistroUsuarioPageComponent } from './pages/login/login-page.component';

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
  component: RegistroUsuarioPageComponent,
},



];
