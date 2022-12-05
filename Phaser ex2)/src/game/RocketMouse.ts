import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import TextureKeys from "../consts/TextureKeys";
import LaserObstacle from "./LaserObstacle";
import SceneKeys from './../consts/SceneKeys';

enum MouseState {
    Running,
    killed,
    Dead
}

export default class RocketMouse extends Phaser.GameObjects.Container {


    private flames: Phaser.GameObjects.Sprite
    private mouse: Phaser.GameObjects.Sprite
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    private mouseState = MouseState.Running

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun)

        this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn)

        this.enableJetpack(false)
        this.add(this.flames)
        this.add(this.mouse)

        scene.physics.add.existing(this)

        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(this.mouse.width, this.mouse.height)
        body.setOffset(this.mouse.width * -0.5, -this.mouse.height) // 이거 대신 setOrigin으로도 위치조정 가능.

        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    enableJetpack(enabled: boolean) {
        this.flames.setVisible(enabled)
    }

    kill() {
        if (this.mouseState !== MouseState.Running) {
            return
        }

        this.mouseState = MouseState.killed;

        this.mouse.play(AnimationKeys.RocketMouseDead)

        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAccelerationY(0)
        body.setVelocity(1000, 0)
        this.enableJetpack(false)
    }

    preUpdate() {

        const body = this.body as Phaser.Physics.Arcade.Body

        switch (this.mouseState) {
            case MouseState.Running:
                {
                // check is space pressed
                if (this.cursors.space?.isDown) {
                    body.setAccelerationY(-600)
                    this.enableJetpack(true)

                    this.mouse.play(AnimationKeys.RocketMouseFly, true)
                }
                else {
                    body.setAccelerationY(0)
                    this.enableJetpack(false)

                    // this.mouse.play(AnimationKeys.RocketMousefall,true)
                }

                // check touching ground
                if (body.blocked.down) {
                    this.mouse.play(AnimationKeys.RocketMouseRun, true)
                }
                else if (body.velocity.y > 0) {
                    this.mouse.play(AnimationKeys.RocketMousefall, true)
                }

                break;
            }

            case MouseState.killed:{
                body.velocity.x *= 0.99

                if(body.velocity.x <= 5)
                {
                    this.mouseState = MouseState.Dead
                }
                break;
            }

            case MouseState.Dead:{
                body.setVelocity(0, 0)

                this.scene.scene.run(SceneKeys.GameOver)
                break;
            }
        }
    }

    
}