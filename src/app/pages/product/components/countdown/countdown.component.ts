import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { map, scan, takeWhile, timer } from "rxjs";

@Component({
  selector: 'countdown',
  imports: [AsyncPipe],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  protected countdownTime$ = timer(0, 1000).pipe(
    scan(acc => acc - 1, this._calculateSecondsToMidnight()),
    takeWhile(value => value >= 0),
    map(value => {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value - (hours * 3600)) / 60);
      const seconds = value - (hours * 3600) - (minutes * 60);

      return `${hours}:${minutes}:${seconds}`.split(':').map(t => t.padStart(2, '0')).join(':');
    })
  )

  private _calculateSecondsToMidnight(): number {
    const now = new Date();
    const then = new Date(now);
    then.setHours(24, 0, 0, 0);
    return Math.floor((then.getTime() - now.getTime()) / 1000);
  }
}