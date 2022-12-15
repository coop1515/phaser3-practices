import Phaser from 'phaser'

export default class Game2 extends Phaser.Scene
{
   constructor()
   {
      super('game')
   }

   preload()
    {
        this.load.image('bg', 'house/bg_repeat_340x640.png');
    }

    create() { 
        
        this.add.image(400, 300, 'bg').setOrigin(0,0);
        // background
        // this.add.image(0,0, 'bg').setOrigin(0,0)
        

    }
}