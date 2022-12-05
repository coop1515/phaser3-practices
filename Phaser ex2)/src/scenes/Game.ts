import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import LaserObstacle from "../game/LaserObstacle";
import RocketMouse from './../game/RocketMouse';

export default class Game extends Phaser.Scene {
    private background !: Phaser.GameObjects.TileSprite;
    private mouseHole !: Phaser.GameObjects.Image;
    private window1 !: Phaser.GameObjects.Image;
    private window2 !: Phaser.GameObjects.Image;
    private bookCase1 !: Phaser.GameObjects.Image;
    private bookCase2 !: Phaser.GameObjects.Image;
    private bookcases: Phaser.GameObjects.Image[] = []
    private windows: Phaser.GameObjects.Image[] = []
    private laserObstacle !: LaserObstacle;
    private coins !: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
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

    create() {

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

        this.windows = [this.window1, this.window2]

        this.bookCase1 = this.add.image(
            Phaser.Math.Between(2200, 2700),
            580,
            TextureKeys.BookCase1
        )
            .setOrigin(0.5, 1)

        this.bookCase2 = this.add.image(
            Phaser.Math.Between(2900, 3400),
            580,
            TextureKeys.BookCase2
        )
            .setOrigin(0.5, 1)

        this.bookcases = [this.bookCase1, this.bookCase2]

        this.laserObstacle = new LaserObstacle(this, 900, 100)
        this.add.existing(this.laserObstacle)
        
        this.coins = this.physics.add.staticGroup()
        this.spawnCoins()

        // player
        // this.add.sprite(
        //     width * 0.5,
        //     height * 0.5,
        //     TextureKeys.RocketMouse,
        //     'rocketmouse_fly01.png'
        // ).play(AnimationKeys.RocketMouseRun)
        // const mouse = this.physics.add.sprite(
        //     width * 0.5,
        //     height * 0.5,
        //     TextureKeys.RocketMouse,
        //     'rocketmouse_fly01.png'
        // )
        // .setOrigin(0.5,1) //setOrigin 초기 시작 지점 x,y
        // .play(AnimationKeys.RocketMouseRun)

        const mouse = new RocketMouse(this, width * 0.5, height - 30)
        this.add.existing(mouse)

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);

        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER, height - 30
        )

        this.cameras.main.startFollow(mouse)
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

        // 레이저 충돌
        this.physics.add.overlap(
            this.laserObstacle,
            mouse,
            this.handleOverlapLaser,
            undefined,
            this
        )
    }

    update(t: number, dt: number) {
        // 쥐구멍 재생성
        this.wrapMouseHole()

        // 창문 다시 재생성
        this.WrapWindows()

        // 책장 재생성
        this.WrapBookcases()

        // 레이저 재생성
        this.wrapLaserObtacle()

        // 카메라따라 백그라운드도 이미지도 이동.
        this.background.setTilePosition(this.cameras.main.scrollX)
    }

    private wrapMouseHole() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if (this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = Phaser.Math.Between(
                rightEdge + 100,
                rightEdge + 1000
            )
        }
    }

    private WrapWindows() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width

        // multiply by 2 to add some more padding
        let width = this.window1.width * 2
        if (this.window1.x + width < scrollX) {
            this.window1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )
            const overlap = this.bookcases.find(bc => {
                return Math.abs(this.window1.x - bc.x) <= this.window1.width
            })

            this.window1.visible = !overlap
        }

        width = this.window2.width
        if (this.window2.x + width < scrollX) {
            this.window2.x = Phaser.Math.Between(
                this.window1.x + width,
                this.window1.x + width + 800
            )

            const overlap = this.bookcases.find(bc => {
                return Math.abs(this.window2.x - bc.x) <= this.window2.width
            })

            this.window2.visible = !overlap
        }
    }

    private WrapBookcases() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width

        // multiply by 2 to add some more padding
        let width = this.bookCase1.width * 2
        if (this.bookCase1.x + width < scrollX) {
            this.bookCase1.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 800
            )

            const overlap = this.windows.find(win => {
                return Math.abs(this.bookCase1.x - win.x) <= this.bookCase1.width
            })

            this.bookCase1.visible = !overlap
        }

        width = this.bookCase2.width
        if (this.bookCase2.x + width < scrollX) {
            this.bookCase2.x = Phaser.Math.Between(
                this.bookCase1.x + width,
                this.bookCase1.x + width + 800
            )

            const overlap = this.windows.find(win => {
                return Math.abs(this.bookCase2.x - win.x) <= this.bookCase2.width
            })

            this.bookCase1.visible = !overlap
        }
    }

    private wrapLaserObtacle() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody;

        const width = body.width;
        if(this.laserObstacle.x + width < scrollX) {
            
            this.laserObstacle.x = Phaser.Math.Between(
            rightEdge + width,
            rightEdge + width + 1000)

            this.laserObstacle.y = Phaser.Math.Between(0, 300)

            body.position.x = this.laserObstacle.x + body.offset.x;
            body.position.y = this.laserObstacle.y
        }

    }

    // private handleOverlapLaser(
    //     obj1: Phaser.GameObjects.GameObject,
    //     obj2: Phaser.GameObjects.GameObject

    // )
    // {
    //     console.log('overlap')
    // }

    private handleOverlapLaser(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	{   
        // console.log('overlap')
        // console.log(" obj ", obj1, " obj2 ", obj2)
		// const laser = obj1 as LaserObstacle
		const mouse = obj2 as RocketMouse // 이부분 다시 체크 obj1이랑 2 차이

		mouse.kill()
	}

    private spawnCoins(){

    }

}