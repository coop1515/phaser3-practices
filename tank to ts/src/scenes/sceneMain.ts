import game, { emitter, G, model } from "../main";
import Align from "../util/align";
import TiledBackground from './../classes/comps/tiledBackground';
import AlignGrid from './../util/alignGrid';
import SoundButtons from './../classes/ui/soundButtons';
import ScoreBox from './../classes/comps/scoreBox';
import RotationChecker from './../util/rotationChecker';



export default class SceneMain extends Phaser.Scene {

    Hello = true;
    canFire?:boolean
    messages:any
    firedFlag?:boolean
    background:any
    aGrid:any
    messageText :any
    messageTimer:any
    scoreBox:any
    tank1:any
    tank2:any
    river:any

    constructor() {
        super('SceneMain');
    }
    preload() {
        //load our images or sounds 
        this.load.image("dirt", "images/main/dirt.png");
        this.load.image("tank1", "images/main/tank1.png");
        this.load.image("tank2", "images/main/tank2.png");
        this.load.image("smoke", "images/main/smoke.png");
        this.load.image("bullet1", "images/main/bullet1.png");
        this.load.image("bullet2", "images/main/bullet2.png");
    }
    create() {
        model.currentScene = this;
        model.score = 0;
        //set up scene vars
        this.canFire = false;
        //create an empty array
        this.messages = [];
        this.firedFlag = false;
        this.setUpMessages();
        //define our objects
        this.background = new TiledBackground({
            scene: this,
            key: 'dirt'
        });
        this.makeRiver();
        this.aGrid = new AlignGrid({
            scene: this
        });
        this.aGrid.showNumbers();
        this.placeTanks();
        this.input.on('pointerdown', this.clicked, this);
        this.messageText = this.add.text(0, 0, "");
        this.messageText.setOrigin(0.5, 0.5);
        Align.center(this.messageText);
        this.messageTimer = this.time.addEvent({
            delay: 1000,
            callback: this.setNextMessage,
            callbackScope: this,
            loop: true
        });
        var sb = new SoundButtons({
            scene: this
        });
        this.scoreBox = new ScoreBox({
            scene: this
        });
        this.aGrid.placeAtIndex(24, this.scoreBox);
        var rotChecker = new RotationChecker({
            scene: this,
            right: "portrait"
        });
        //
        //
        //
        emitter.on(rotChecker.WRONG_WAY, this.turnedWrongWay);
        emitter.on(rotChecker.CORRECTED, this.rightWay);
        emitter.on(rotChecker.RIGHT_WAY, this.rightWay);
        rotChecker.check();
    }
    turnedWrongWay() {
        model.paused = true;
        // (document.getElementById('wrongWayPortrait') as HTMLElement).style.display = "block";
    }
    rightWay() {
        model.paused = false;
        // (document.getElementById('wrongWayPortrait') as HTMLElement).style.display = "none";
    }
    setNextMessage() {
        if (model.paused==true)
        {
            return;
        }
        var message = this.messages.shift();
        console.log(message);
        if (this.messages.length == 0) {
            this.messageTimer.remove(false);
            this.canFire = true;
            var delay = 200 + Math.random() * 1000;
            this.shootTimer = this.time.addEvent({
                delay: delay,
                callback: this.computerShoot,
                callbackScope: this,
                loop: false
            });
        }
        this.messageText.setText(message.text);
        this.messageText.setStyle(message.style);
    }
    computerShoot() {
        if (this.firedFlag == false) {
            this.setLoseMessage("Waited Too Long!");
        }
        this.showBullet(this.tank2, this.tank1);
    }
    setUpMessages() {
        this.messages.push({
            text: "Ready",
            style: {
                fontFamily: 'Fresca',
                fontSize: '46px',
                color: '#000000'
            }
        });
        this.messages.push({
            text: "Steady",
            style: {
                fontFamily: 'Fresca',
                fontSize: '46px',
                color: '#000000'
            }
        });
        this.messages.push({
            text: "Fire!",
            style: {
                fontFamily: 'Fresca',
                fontSize: '72px',
                color: '#ff0000'
            }
        });
    }
    clicked() {
        console.log("clicked!");
        if (this.canFire == true) {
            this.showBullet(this.tank1, this.tank2);
        } else {
            this.setLoseMessage("Fired too early!");
            this.showBullet(this.tank2, this.tank1);
        }
    }
    makeRiver() {
        //add graphics
        this.river = this.add.graphics();
        //set the fill style to blue with no trasparency
        this.river.fillStyle(0x12E5E8, 1);
        //calculate a height of 20 percent of the game's height
        var riverH = game.config.height as number * .2;
        //make a rectangle
        this.river.fillRect(0, 0, game.config.width, riverH);
        //position the river at half of the games height
        //minus half of the hieght of the river
        this.river.y = game.config.height as number / 2 - riverH / 2;
    }
    placeTanks() {
        //add the images
        this.tank1 = this.add.image(0, 0, "tank1");
        this.tank2 = this.add.image(0, 0, "tank2");
        //scale the tanks
        Align.scaleToGameW(this.tank1, .2);
        Align.scaleToGameW(this.tank2, .2);
        //position on grid
        this.aGrid.placeAtIndex(2, this.tank2);
        this.aGrid.placeAtIndex(22, this.tank1);
    }
    showSmoke(tank:any) {
        var smoke = this.add.image(0, 0, "smoke");
        Align.scaleToGameW(smoke, .2);
        var ty = 0;
        if (tank.y < game.config.height as any / 2) {
            this.aGrid.placeAtIndex(7, smoke);
            ty = game.config.height as any;
        } else {
            this.aGrid.placeAtIndex(17, smoke);
        }
        this.tweens.add({
            targets: smoke,
            duration: 1500,
            y: ty,
            scaleX: 0,
            scaleY: 0,
            alpha: 0
        });
    }
    showBullet(firedTank, hitTank) {
        if (this.firedFlag == true) {
            return;
        }
        this.firedFlag = true;
        this.messageTimer.remove(false);
        this.showSmoke(firedTank);
        var ty = hitTank.y;
        if (firedTank.y < game.config.height / 2) {
            var bulletKey = "bullet2";
            var startY = firedTank.y + firedTank.displayHeight / 2;
            var angle = 180;
        } else {
            var bulletKey = "bullet1";
            var startY = firedTank.y - firedTank.displayHeight / 2;
            var angle = 0;
        }
        var bullet = this.add.image(firedTank.x, startY, bulletKey);
        bullet.angle = angle;
        Align.scaleToGameW(bullet, .05);
        this.tweens.add({
            targets: bullet,
            duration: 200,
            y: ty,
            onComplete: this.onBulletComplete,
            onCompleteParams: [{
                tank: hitTank,
                scope: this
            }]
        });
        emitter.emit(G.PLAY_SOUND, "boom");
    }
    onBulletComplete(tween, targets, custom) {
        var scope = custom.scope;
        var tank = custom.tank;
        targets[0].destroy();
        scope.tankHit(tank);
    }
    tankHit(tank) {
        var angle = Math.floor(Math.random() * 90) - 45;
        //set the target to 0
        var ty = 0;
        //if the player's tank then set ty to bottom of the screen
        if (tank == this.tank1) {
            ty = game.config.height;
            this.playAgainTimer = this.time.addEvent({
                delay: 1000,
                callback: this.playAgain,
                callbackScope: this,
                loop: false
            });
        } else {
            emitter.emit(G.UP_POINTS, 1);
            //if not the player's tank then reset
            this.resetTimer = this.time.addEvent({
                delay: 1000,
                callback: this.resetAll,
                callbackScope: this,
                loop: false
            });
        }
        this.tweens.add({
            targets: tank,
            duration: 500,
            y: ty,
            angle: angle
        });
        emitter.emit(G.PLAY_SOUND, "explode");
    }
    setLoseMessage(reason) {
        console.log(reason);
        this.messageText.setText(reason);
        this.messageText.setStyle({
            fontFamily: 'Fresca',
            fontSize: game.config.width / 10,
            color: '#ff0000'
        });
    }
    resetAll() {
        this.canFire = false;
        this.firedFlag = false;
        this.tank1.angle = 0;
        this.tank2.angle = 0;
        this.aGrid.placeAtIndex(2, this.tank2);
        this.aGrid.placeAtIndex(22, this.tank1);
        this.setUpMessages();
        this.messageTimer = this.time.addEvent({
            delay: 1000,
            callback: this.setNextMessage,
            callbackScope: this,
            loop: true
        });
    }
    playAgain() {
        this.scene.start("SceneOver");
    }
    update() {
        //constant running loop
    }
}