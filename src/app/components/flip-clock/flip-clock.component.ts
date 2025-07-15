import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-flip-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-clock.component.html',
  styleUrls: ['./flip-clock.component.css']
})
export class FlipClockComponent implements OnInit, OnDestroy {
  hoursTens = 0;
  hoursUnits = 0;
  minutesTens = 0;
  minutesUnits = 0;
  secondsTens = 0;
  secondsUnits = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.updateFromDate(new Date());
    this.intervalId = setInterval(() => {
      this.updateFromDate(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateFromDate(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    this.hoursTens = Math.floor(hours / 10);
    this.hoursUnits = hours % 10;
    this.minutesTens = Math.floor(minutes / 10);
    this.minutesUnits = minutes % 10;
    this.secondsTens = Math.floor(seconds / 10);
    this.secondsUnits = seconds % 10;
  }
}