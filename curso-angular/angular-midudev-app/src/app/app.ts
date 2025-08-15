import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, User],
  template: '<app-user></app-user>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-midudev-app');
}
