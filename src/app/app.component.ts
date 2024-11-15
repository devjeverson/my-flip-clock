import { Component } from '@angular/core';
import { FlipClockComponent } from './flip-clock/flip-clock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlipClockComponent],
  template: '<app-flip-clock></app-flip-clock>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}