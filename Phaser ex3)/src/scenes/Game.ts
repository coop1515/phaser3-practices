import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {

  }

  create() {
   this.stroke()
  }

  stroke() {
    var graphics = this.add.graphics();

    var color = 0xffff00;
    var thickness = 4;
    var alpha = 1;

    graphics.lineStyle(thickness, color, alpha);

    graphics.beginPath();

    graphics.moveTo(400, 100);
    graphics.lineTo(200, 278);
    graphics.lineTo(340, 430);
    graphics.lineTo(650, 80);

    graphics.closePath();
    graphics.strokePath(); //Path를 그려주는것
  }

  update(t: number, dt: number) {
    
  }
}