import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flip-clock',
  standalone: true,
  templateUrl: './flip-clock.component.html',
  styleUrls: ['./flip-clock.component.css']
})
export class FlipClockComponent implements OnInit {
  hoursTens = 0;
  hoursUnits = 0;
  minutesTens = 0;
  minutesUnits = 0;
  amPm = 'AM';

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    this.amPm = hours >= 12 ? 'PM' : 'AM';
    const hoursFormatted = hours % 12 || 12; // 12-hour format

    this.hoursTens = Math.floor(hoursFormatted / 10);
    this.hoursUnits = hoursFormatted % 10;
    this.minutesTens = Math.floor(minutes / 10);
    this.minutesUnits = minutes % 10;
  }
}