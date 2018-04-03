import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular Form';
  subtitle = 'Example with good accessibility';
  likeCounter = 12;
  ariaLiveAnnouncement = '';

  // Simple like feature code
  addToCounter() {
      ++this.likeCounter;
      this.ariaLiveAnnouncement = this.likeCounter + ' likes';
  }
}
