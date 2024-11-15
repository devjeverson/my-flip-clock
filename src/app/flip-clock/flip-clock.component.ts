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
  secondsTens = 0;
  secondsUnits = 0;

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000); // Atualiza a cada segundo
  }

  updateClock(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hoursFormatted = hours % 24 || 24; // Formato 24 horas

    // Calcula cada dígito do relógio
    this.hoursTens = Math.floor(hoursFormatted / 10);
    this.hoursUnits = hoursFormatted % 10;
    this.minutesTens = Math.floor(minutes / 10);
    this.minutesUnits = minutes % 10;
    this.secondsTens = Math.floor(seconds / 10);
    this.secondsUnits = seconds % 10;
  }
}