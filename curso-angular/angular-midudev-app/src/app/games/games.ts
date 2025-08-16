import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
  template: `
  <h3>Games List for {{ username }}</h3>
    <ul>
      @for (game of games; track game.id){
        <li 
        (click)="fav(game.title)">
          <h2>{{ game.title }}</h2>
          <p>{{ game.description }}</p>
          <p><strong>Release Date:</strong> {{ game.releaseDate }}</p>
        </li>
      }
    </ul>
  `,
  styleUrl: './games.css'
})
export class Games {
  @Input() username = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  fav(gameTitle: string) {
    this.addFavoriteEvent.emit(gameTitle);
    console.log(`Favorite game added: ${gameTitle}`);
  }

  games = [
    {
      id: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      description: 'An open-world action-adventure game set in a vast, post-apocalyptic Hyrule.',
      releaseDate: 'March 3, 2017',
    },
    {
      id: 2,
      title: 'Super Mario Odyssey',
      description: 'A 3D platformer where Mario travels across various kingdoms to rescue Princess Peach.',
      releaseDate: 'October 27, 2017',
    },
    {
      id: 3,
      title: 'Animal Crossing: New Horizons',
      description: 'A life simulation game where players create and manage their own island paradise.',
      releaseDate: 'March 20, 2020',
    },
    {
      id: 4,
      title: 'Splatoon 2',
      description: 'A colorful third-person shooter where players control squid-like characters in turf wars.',
      releaseDate: 'July 21, 2017',
    },
  ]
}
