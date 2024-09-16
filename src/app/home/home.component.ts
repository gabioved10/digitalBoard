import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  prayerTimes$: Observable<any>; // Observable for Firebase data

  private timer: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.updateClock(); // Initialize the clock immediately
    this.timer = setInterval(() => this.updateClock(), 1000); // Update the clock every second

    // Fetch prayer times from Firebase
    this.prayerTimes$ = this.db.object('prayerTimes').valueChanges();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer); // Clear the interval to avoid memory leaks
    }
  }

  private updateClock(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;
  }
}
