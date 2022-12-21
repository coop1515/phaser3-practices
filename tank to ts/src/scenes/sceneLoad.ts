import  Phaser from 'phaser';
import game from './../main';
import Align from './../util/align';
import Bar from './../classes/comps/bar';


export default class SceneLoad extends Phaser.Scene {
   
    bar !: any
    progText !: any

    constructor() {
        super('SceneLoad');
    }
    preload() {
        this.bar = new Bar({
            scene: this
        });
        //
        //make the text to hold the progress value
        //
        this.progText = this.add.text(game.config.width as number / 2, game.config.height as number / 2, "0%", {
            color: '#ffffff',
            fontSize: (game.config.width as number / 25).toString()
        });
        this.progText.setOrigin(0.5, 0.5);
        //
        // 
        //
        Align.center(this.bar);
        Align.center(this.progText);
        //
        //
        this.load.on('progress', this.onProgress, this);


        this.load.image("button1", "images/ui/buttons/1/1.png");
        this.load.image("title", "images/main/title.png");
        this.load.audio("boom", ["audio/boom.wav", "audio/boom.oog"]);
        this.load.audio("explode", ["audio/explode.wav", "audio/explode.oog"]);
        this.load.audio("heroism", ["audio/heroism.wav", "audio/heroism.oog"]);
        //
        //
        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");
    }
    
    onProgress(value?:any) {
        var per = Math.floor(value * 100);
        this.progText.setText("Loading " + per + "%");
        this.bar.setPercent(value);
    }

    create() {
        this.scene.start("SceneTitle");
    }
}