import { Component, ViewChild, ElementRef } from '@angular/core';
import { Player } from './objects/Player';
import { Ball } from './objects/Ball';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pingpong';

  @ViewChild('playZone', {read: ElementRef}) playZone: ElementRef<HTMLInputElement>;
  @ViewChild('playerRed', {read: ElementRef}) playerRed: ElementRef<HTMLInputElement>;
  @ViewChild('playerBlue', {read: ElementRef}) playerBlue: ElementRef<HTMLInputElement>;
  @ViewChild('ball', {read: ElementRef}) ball: ElementRef<HTMLInputElement>;
  @ViewChild('startGame', {read: ElementRef}) startGame: ElementRef<HTMLInputElement>;
  @ViewChild('endGame', {read: ElementRef}) endGame: ElementRef<HTMLInputElement>;

  private ballObj: any;


  constructor() {
    console.log('====== Initialized ======');
  }

  public f_startGame() {
    console.log('Start Game');
    this.ballObj.startGame();
  }

  public f_endGame() {
    console.log('End Game');
    this.ballObj.resetGame();
  }

  ngAfterViewInit() {
    this.ballObj = new Ball(this.ball);

    const bluePlayer = new Player(this.playerBlue, ["w", "s"]);
    const redPlayer = new Player(this.playerRed, ["ArrowUp", "ArrowDown"]);
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      switch(event.key) {
        case "w":
        case "s":
          bluePlayer.doPlayerAction(event.key);
        break;
        case "ArrowUp":
        case "ArrowDown":
          redPlayer.doPlayerAction(event.key);
        break;

        case "g":
          this.ballObj.stepMovementAction();
          break;
      }
    });
  }
}
