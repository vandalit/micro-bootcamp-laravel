import { Component } from '@angular/core';
import { Games } from "../games/games";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [Games],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  username = 'Bootcamper';
  isLoggedIn = false;
  favGame ='';

  getFavorite(gameTitle: string) {
    this.favGame = gameTitle;
  }

  greet() {
    alert(`Hola ${this.username}`);
  }
}
