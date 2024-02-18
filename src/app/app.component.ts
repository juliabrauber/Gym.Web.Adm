import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  LOAD_BAR_INCLUDE_SPINNER = false;
  LOAD_BAR_HEIGHT = '2px';
  LOAD_BAR_COLOR = '#0055A2';
}
