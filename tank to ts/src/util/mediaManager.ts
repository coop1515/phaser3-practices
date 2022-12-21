import { emitter, G, model } from "../main";

export default class MediaManager {
    [x: string]: any;
    config !: any

    constructor(config: any) {
        this.scene = config.scene;
    }
    init() {
        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }
    musicChanged() {
        if (this.background) {
            if (model.musicOn == false) {
                this.background.stop();
            } else {
                this.background.play();
            }
        }
    }
    playSound(key :any) {
        if (model.soundOn == true) {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
    }
    setBackgroundMusic(key :any) {
        if (model.musicOn == true) {
            this.background = this.scene.sound.add(key, {
                volume: .5,
                loop: true
            });
            this.background.play();
        }
    }
}