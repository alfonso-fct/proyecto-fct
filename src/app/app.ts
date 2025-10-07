
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/shared/navbar/navbar";

import { ReactiveFormsModule } from '@angular/forms';
import { ArticulosPageComponent } from './pages/articulos/articulos-page.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./components/shared/footer/footer.component";


@Component({

  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet, Navbar, ReactiveFormsModule, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'

})
export class App {
  protected readonly title = signal('Proyecto');
}

