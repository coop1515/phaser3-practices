import { emitter, G, model } from "../../main";

export default class Controller {
    scene: any;
    constructor() {
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_POINTS, this.upPoints);
        emitter.on(G.TOGGLE_SOUND, this.toggleSound);
        emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
        emitter.on(G.START_GAME, this.startGame);
    }
    toggleSound(val?:any) {
        model.soundOn = val;
    }
    toggleMusic(val?:any) {
        model.musicOn = val;
    }
    setScore(score?:any) {
        model.score = score;
    }
    upPoints(points?:any) {
        var score = model.score;
        score += points;
        model.score = score;
    }
    startGame() {
        console.log(this)
        model.currentScene.scene.start("SceneMain");
        
    }
}