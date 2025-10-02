import { ChangeDetectionStrategy,Component,signal } from "@angular/core";

@Component({

templateUrl:`./principal-page.component.html`,


})


export class PrincipalPageComponent{

  saludo=signal('Hola!!!');


saludar(){

  alert(this.saludo);

}



}
