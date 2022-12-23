import Phaser from './lib/phaser.js';


import Demo from './scenes/Test.js';

// console.dir(Phaser);

// console.log("Hello, World!");

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Demo],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
})