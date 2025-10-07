import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-comics',
  imports: [],
  templateUrl: './comics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicsComponent { }
