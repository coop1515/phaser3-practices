import { emitter, G, model } from "../../main";

export default class ScoreBox extends Phaser.GameObjects.Container {
    text1 ?: Phaser.GameObjects.Text | undefined
    constructor(config :any) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        super(config.scene);
        this.scene = config.scene;

        //add a textfield
        this.text1 = this.scene.add.text(0, 0, "SCORE:0");
        this.text1.setOrigin(0.5, 0.5);
        this.add(this.text1);

        //if there is position information then apply it
        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }

        //add to the scene
        this.scene.add.existing(this);
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }
    scoreUpdated() {
        if(this.text1)
        this.text1.setText("SCORE:" + model.score);
    }
}