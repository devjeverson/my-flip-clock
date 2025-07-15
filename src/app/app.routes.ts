import { Routes } from '@angular/router';
import { FlipClockComponent } from './components/flip-clock/flip-clock.component';
import { PomodoroTimerComponent } from './components/pomodoro-timer/pomodoro-timer.component';

export const routes: Routes = [
  { path: '', component: FlipClockComponent },
  { path: 'pomodoro', component: PomodoroTimerComponent },
  { path: '**', redirectTo: '' }
];
