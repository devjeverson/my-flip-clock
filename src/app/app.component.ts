import { Component } from '@angular/core';
import { FlipClockComponent } from './components/flip-clock/flip-clock.component';
import { CommonModule } from '@angular/common';
import { PomodoroTimerComponent } from './components/pomodoro-timer/pomodoro-timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FlipClockComponent, PomodoroTimerComponent],
  template: '<app-flip-clock></app-flip-clock>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}