import Phaser from "../lib/phaser.js";
import Carrot from "../game/Carrot.js";

export default class Game extends Phaser.Scene{

    carrotsCollected = 0;

    constructor(){
        super('game')
    }

    init(){
        this.carrotsCollected = 0
    }

    /** @type {Phaser.physics.Arcade.sprite} */
    //?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    player
    
    /** @type {Phaser.physics.Arcade.staticGroup} */
    platforms

    /** @type {Phaser.Types.input.keyboard.cursorKeys} */
    cursors

    /** @type {Phaser.physics.Arcade.Group} */
    carrots

    /** @type {Phaser.GameObjects.Text} */
    carrotsCollectedText

    preload(){
        this.load.image('background', 'assets/bg_layer1.png')
        this.load.image('platform', 'assets/ground_grass.png')
        this.load.image('bunny-stand', 'assets/bunny1_stand.png')
        this.cursors = this.input.keyboard.createCursorKeys()
        this.load.image('carrot', 'assets/carrot.png')
        this.load.image('bunny-jump', 'assets/bunny1_jump.png')
        // this.load.audio('jump', 'assets/sfx/phaseJump1.wav')
    }

    create(){
        this.add.image(240,280,'background').setScale(1.5)
            .setScrollFactor(1,0)
        
        // platform
        // this.physics.add.image(260,320,'platform')
        //     .setScale(0.5);
        // const platforms = this.physics.add.staticGroup()
    
        this.platforms = this.physics.add.staticGroup()
        
        // platform 발판 생성
        for(let i = 0; i <5; ++i){
            const x = Phaser.Math.Between(80,400)
            const y = 150 * i

            const platform = this.platforms.create(x, y, 'platform')
                                    // .setScale(0.5)
            // const platform = this.physics.add.image(x, y, 'platform')
            platform.scale = 0.5

            const body = platform.body
            body.updateFromGameObject()
        }

        // Player
        // this.physics.add.sprite(240,320, 'bunny-stand')
        //             .setScale(0.3)

        // const player = this.physics.add.sprite(240, 320, 'bunny-stand')
        //                             .setScale(0.3)

        this.player = this.physics.add.sprite(240, 320, 'bunny-stand')
                                    .setScale(0.3)
        
        // platforms와 this.player 두개 사이의 물리법칙(충돌)
        this.physics.add.collider(this.platforms,this.player);
        
        // body.checkCollision 바디의 충돌 여부와 방향 확인.
        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        //player 기준으로 카메라(뷰) 따라감.
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setDeadzone(this.scale.width * 1.5)

        // carrot
        // const carrot = new Carrot(this, 240, 320, 'carrot')
        // this.add.existing(carrot)
        this.carrots = this.physics.add.group({
            classType: Carrot
        })

        // this.carrots.get(240, 320, 'carrot').setScale(0.1)
        this.physics.add.collider(this.platforms, this.carrots)
        
        this.physics.add.overlap(
            this.player,
            this.carrots,
            this.handleCollectCarrot,
            undefined,
            this
        )
        
        const style = { color: '#000', fontSize: 24}
        this.carrotsCollectedText = this.add.text(240, 10, 'Carrots: 0', style)
            // 화면 스크롤에 따라 가는것
            .setScrollFactor(0)
            // 위치선정
            .setOrigin(0.5,0)
    }

    update(t, dt){

        this.platforms.children.iterate(child => {
            const platform = child

            const scrollY = this.cameras.main.scrollY
            if(platform.y >= scrollY + 700)
            {
                platform.y = scrollY - Phaser.Math.Between(50, 100)
                platform.body.updateFromGameObject()

                // create a carrot above the platorm being reused
                this.addCarrotAbove(platform)
            }
        })
        
        // Player Jump
        const touchingDown = this.player.body.touching.down

        if (touchingDown){
            this.player.setVelocityY(-300)

            this.player.setTexture('bunny-jump')

            // this.sound.play('jump')
        }

        const vy = this.player.body.velocity.y
        if (vy > 0 && this.player.texture.key !== 'bunny-stand'){
            this.player.setTexture('bunny-stand')
        }

        // Player Move
        if (this.cursors.left.isDown && !touchingDown){
            this.player.setVelocityX(-200)
        }
        else if (this.cursors.right.isDown && !touchingDown){
            this.player.setVelocityX(200)
        }
        else{
            // stop
            this.player.setVelocityX(0)
        }

        this.horizontalWrap(this.player)

        const bottomPlatform = this.findBottomMostPlatform()
        if(this.player.y > bottomPlatform.y + 200){
            // console.log('game over')
            this.scene.start('game-over')
        }

    }

    /**
     * @param {Phaser.GameObjects.sprite} sprite
     */
    horizontalWrap(sprite){
        const halfWidth = sprite.displayWidth * 0.5
        const gameWidth = this.scale.width
        if (sprite.x < -halfWidth){
            sprite.x = gameWidth + halfWidth
        }

        else if (sprite.x > gameWidth + halfWidth){
            sprite.x = -halfWidth
        }
    }

    /** 
     * @param {Phaser.GameObjects.Sprite} sprite
     */
    addCarrotAbove(sprite){
        const y = sprite.y - sprite.displayHeight

        /** @type {Phaser.Physics.Arcade.Sprite} */
        const carrot = this.carrots.get(sprite.x, y, 'carrot')

        carrot.setActive(true)
        carrot.setVisible(true)

        this.add.existing(carrot)

        // update the physics body size
        carrot.body.setSize(carrot.width, carrot.height)
        // carrot.body.setSize(100, 100)

        this.physics.world.enable(carrot)

        return carrot

    }

    handleCollectCarrot(player, carrot){

        // hide from display
        this.carrots.killAndHide(carrot)

        // disable from physics world
        this.physics.world.disableBody(carrot.body)

        // this.carrotsCollected = this.carrotsCollected + 1
        this.carrotsCollected++

        const value = `Carrots: ${this.carrotsCollected}`
        this.carrotsCollectedText.text = value
    }

    findBottomMostPlatform(){
        const platforms = this.platforms.getChildren()
        let bottomPlatform = platforms[0]

        for(let i = 1; i < platforms.length; ++i){
            const platform = platforms[i]

            if (platform.y < bottomPlatform.y){
                continue
            }

            bottomPlatform = platform
        }

        return bottomPlatform
    }
}