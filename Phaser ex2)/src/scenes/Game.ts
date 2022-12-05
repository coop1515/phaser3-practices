import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Game extends Phaser.Scene{
    private background !: Phaser.GameObjects.TileSprite;
    private mouseHole !: Phaser.GameObjects.Image;
    private window1 !: Phaser.GameObjects.Image;
    private window2 !: Phaser.GameObjects.Image;

    constructor(){
        super('game')
    }
    
    // preload(){
    //     console.dir(Phaser);
    //     // this.load.image('background', 'house/bg_repeat_340x640.png')
    //     // this.load.atlas(
    //     //     'rocket-mouse',
    //     //     'characters/rocket-mouse.png',
    //     //     'characters/rocket-mouse.json'
    //     // )
    // }

    create(){

        // Preloader.ts로 소스 이동.
        // this.anims.create({
        //     key: 'rocket-mouse-run',
        //     frames: this.anims.generateFrameNames('rocket-mouse', {
        //         start: 1,
        //         end: 4,
        //         prefix: 'rocketmouse_run',
        //         zeroPad: 2,
        //         suffix: '.png'
        //     }),
        //     frameRate: 10,
        //     repeat: -1
        // })

        // background
        // this.add.image(0,0, 'background')
        //     .setOrigin(0,0)

        const width = this.scale.width
        const height = this.scale.height
        
        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0, 0)
        
        this.mouseHole = this.add.image(
            Phaser.Math.Between(900, 1500),
            501,
            TextureKeys.MouseHole
        )
        
        this.window1 = this.add.image(
            Phaser.Math.Between(900, 1300),
            200,
            TextureKeys.Window1
        )

        this.window2 = this.add.image(
            Phaser.Math.Between(1600, 2000),
            200,
            TextureKeys.Window2
        )

        // player
        // this.add.sprite(
        //     width * 0.5,
        //     height * 0.5,
        //     TextureKeys.RocketMouse,
        //     'rocketmouse_fly01.png'
        // ).play(AnimationKeys.RocketMouseRun)
        const mouse = this.physics.add.sprite(
            width * 0.5,
            height * 0.5,
            TextureKeys.RocketMouse,
            'rocketmouse_fly01.png'
        )
        .setOrigin(0.5,1) //setOrigin 초기 시작 지점 x,y
        .play(AnimationKeys.RocketMouseRun)

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);

        body.setVelocityX(200);

        this.physics.world.setBounds(
            0,0,
            Number.MAX_SAFE_INTEGER, height - 30
        )

        this.cameras.main.startFollow(mouse)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
    }

    update(t: number, dt: number){
        this.wrapMouseHole()

        this.background.setTilePosition(this.cameras.main.scrollX)
    }

    private wrapMouseHole(){
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if(this.mouseHole.x + this.mouseHole.width < scrollX){
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            )
        }
    }
}