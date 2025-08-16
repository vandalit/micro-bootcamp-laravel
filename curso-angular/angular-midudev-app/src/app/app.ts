import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user/user';
import { Comments } from "./comments/comments";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, User, Comments],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-midudev-app');
}
