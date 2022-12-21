import game, { G } from '../../main';
import ToggleButton from './toggleButton';

export default class SoundButtons extends Phaser.GameObjects.Container {

    musicButton: any;
    sfxButton
    constructor(config: { scene: any; }) {
        super(config.scene);
        this.scene = config.scene;

        //make a music button

        this.musicButton = new ToggleButton({
            scene: this.scene,
            backKey: 'toggleBack',
            onIcon: 'musicOn',
            offIcon: 'musicOff',
            event: G.TOGGLE_MUSIC
        });

        //make a sound button
        this.sfxButton = new ToggleButton({
            scene: this.scene,
            backKey: 'toggleBack',
            onIcon: 'sfxOn',
            offIcon: 'sfxOff',
            event: G.TOGGLE_SOUND
        });

        //add the buttons to the container
        this.add(this.musicButton);
        this.add(this.sfxButton);
       
        //position the buttons
        this.musicButton.y = this.musicButton.height / 2;
        this.musicButton.x = this.musicButton.width / 2;
        this.sfxButton.x = game.config.width as number - this.sfxButton.width / 2;
        this.sfxButton.y = this.musicButton.y;

        //add the sound buttons to the scene
        this.scene.add.existing(this);
    }
}