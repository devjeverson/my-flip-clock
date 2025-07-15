import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PomodoroService, PomodoroState } from '../../services/pomodoro.service';
import { Subscription } from 'rxjs';

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

  constructor(public pomodoro: PomodoroService) {}

  ngOnInit(): void {
    this.sub = this.pomodoro.state$.subscribe(s => this.state = s);
  }

  get label(): string {
    const m = this.state.mode;
    return m === 'focus' ? 'Foco' : m === 'shortBreak' ? 'Pausa Curta' : 'Pausa Longa';
  }

  get formattedTime(): string {
    const m = Math.floor(this.state.timeLeft / 60).toString().padStart(2, '0');
    const s = (this.state.timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
