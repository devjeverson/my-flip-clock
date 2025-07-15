import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PomodoroService, PomodoroState } from '../../services/pomodoro.service';
import { Subscription } from 'rxjs';
import { inject } from '@angular/core';

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {
  state!: PomodoroState;
  private sub!: Subscription;

  pomodoro = inject(PomodoroService);

  ngOnInit(): void {
    this.sub = this.pomodoro.state$.subscribe(s => this.state = s);
  }

  get label(): string {
    const m = this.state.mode;
    return m === 'focus' ? 'Foco' : m === 'shortBreak' ? 'Pausa Curta' : 'Pausa Longa';
  }

  get formattedTime(): string {
  const total = this.state.timeLeft * 1000 + this.state.milliseconds; // exemplo, 150030 ms
  const minutes = Math.floor(total / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((total % 60000) / 1000).toString().padStart(2, '0');
  const centiseconds = Math.floor((total % 1000) / 10).toString().padStart(2, '0');

  return `${minutes}:${seconds}:${centiseconds}`;
}


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
