import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroState {
  mode: PomodoroMode;
  timeLeft: number;
  cycleCount: number;
  running: boolean;
}

@Injectable({ providedIn: 'root' })
export class PomodoroService {
  private readonly FOCUS_DURATION = 25 * 60;
  private readonly SHORT_BREAK = 5 * 60;
  private readonly LONG_BREAK = 20 * 60;

  private intervalId?: number;
  private stateSubject = new BehaviorSubject<PomodoroState>({
    mode: 'focus',
    timeLeft: this.FOCUS_DURATION,
    cycleCount: 0,
    running: false,
  });

  state$ = this.stateSubject.asObservable();

  startPause(): void {
    const state = this.stateSubject.value;
    if (state.running) {
      this.clearTimer();
      this.setState({ ...state, running: false });
    } else {
      this.setState({ ...state, running: true });
      this.intervalId = window.setInterval(() => this.tick(), 1000);
    }
  }

  reset(): void {
    const state = this.stateSubject.value;
    const duration = this.getDurationByMode(state.mode);
    this.clearTimer();
    this.setState({ ...state, timeLeft: duration, running: false });
  }

  private tick(): void {
    const state = this.stateSubject.value;
    if (state.timeLeft <= 1) {
      this.clearTimer();
      this.completeCycle(state);
    } else {
      this.setState({ ...state, timeLeft: state.timeLeft - 1 });
    }
  }

  private completeCycle(state: PomodoroState): void {
    let nextMode: PomodoroMode = 'focus';
    let cycleCount = state.cycleCount;

    if (state.mode === 'focus') {
      cycleCount++;
      nextMode = cycleCount % 4 === 0 ? 'longBreak' : 'shortBreak';
    }

    const timeLeft = this.getDurationByMode(nextMode);
    this.setState({ mode: nextMode, timeLeft, cycleCount, running: true });
    this.intervalId = window.setInterval(() => this.tick(), 1000);
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private getDurationByMode(mode: PomodoroMode): number {
    return mode === 'focus'
      ? this.FOCUS_DURATION
      : mode === 'shortBreak'
      ? this.SHORT_BREAK
      : this.LONG_BREAK;
  }

  private setState(state: PomodoroState): void {
    this.stateSubject.next(state);
  }
}
