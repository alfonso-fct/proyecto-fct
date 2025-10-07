import { Routes } from '@angular/router';
import { PrincipalPageComponent } from './pages/principal/principal-page.component';
import { ArticulosPageComponent } from './pages/articulos/articulos-page.component';
import { RegistroUsuarioPageComponent } from './pages/Registrar/login-page.component';
import { FigurasComponent } from './pages/figuras/figuras.component';
import { JuegosComponent } from './pages/juegos/juegos.component';
import { ComicsComponent } from './pages/comics/comics.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [

{
  path:'',
  component: PrincipalPageComponent,
},
{
  path:'figuras',
  component: FigurasComponent,
},
{
  path:'juegos',
  component: JuegosComponent,
},
{
  path:'comics',
  component: ComicsComponent  ,
},

{
  path:'articulos',
  component: ArticulosPageComponent,
},
{
  path:'registrar',
  component: RegistroUsuarioPageComponent,
},
{
  path:'login',
  component: LoginComponent,
},



];
