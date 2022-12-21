import { emitter, G } from "../../main";

export default class Model {
    _score:number;
    soundOn:boolean
    _musicOn:boolean
    currentScene: any;

    constructor() {
        this._score = 0;
        //for sound effects
        this.soundOn = true;
        //for background music
        this._musicOn = true;
    }
    set score(val) {
        this._score = val;
        console.log("score updated!");
        emitter.emit(G.SCORE_UPDATED);
    }
    get score() {
        return this._score;
    }
    set musicOn(val) {
        this._musicOn = val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOn() {
        return this._musicOn;
    }
}