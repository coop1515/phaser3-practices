
import game, { emitter, model } from './../main';

export default class RotationChecker {
    wrongFlag
    WRONG_WAY
    CORRECTED
    PORTRAIT
    LANDSCAPE
    right
    RIGHT_WAY : any
    scene

    constructor(config:any) {
        this.wrongFlag = false;
        //
        //event constants
        //
        this.PORTRAIT = "portrait";
        this.LANDSCAPE = "landscape";
        //
        this.WRONG_WAY = "wrongWay";
        this.CORRECTED = "correctedWay";
        //
        //
        this.scene = config.scene;
        this.right = config.right;
        // this.scene.events.on('resize', this.checkSize, this);
    }
    check() { console.log('check')
        this.checkSize(game.config.width as number, game.config.height as number);
    }
    checkSize(w : number, h: number) {
        console.log('checkSize', w, h)
        //only check if mobile!
        //-1 is not mobile so emit RIGHT_WAY event
        // if (model.isMobile == -1) {
        //     emitter.emit(this.RIGHT_WAY);
        //     return;
        // }
        if (w > h) {
            //this is landscape!
            //
            if (this.right == this.LANDSCAPE) {
                //if it was wrong before and now it is right
                if (this.wrongFlag == true) {
                    //then send the corrected event
                    emitter.emit(this.CORRECTED);
                } else {
                    //turned correct
                    emitter.emit(this.RIGHT_WAY);
                }
            } else {
                //this is wrong
                this.wrongFlag = true;
                emitter.emit(this.WRONG_WAY);
            }
        } else {
            //this is portrait!
            //
            if (this.right == this.PORTRAIT) {
                //if it was wrong before and now it is right
                if (this.wrongFlag == true) {
                    //then send the corrected event
                    emitter.emit(this.CORRECTED);
                } else {
                    //turned correct
                    emitter.emit(this.RIGHT_WAY);
                }
            } else {
                //this is wrong
                this.wrongFlag = true;
                emitter.emit(this.WRONG_WAY);
            }
        }
    }
}