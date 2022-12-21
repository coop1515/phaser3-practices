
import game from '../main';

export default class AlignGrid {

    config: any
    scene !: Phaser.Scene
    cw!: number
    ch!: number
    graphics!: Phaser.GameObjects.Graphics
    gridLayer!: Phaser.GameObjects.Container
    ow!: number
    oh!: number
    scale!: number
    

    constructor(config) {
        this.config = config;
        if (!config.scene) {
            console.log("missing scene");
            return;
        }
        if (!config.rows) {
            config.rows = 5;
        }
        if (!config.cols) {
            config.cols = 5;
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        if (!config.width) {
            config.width = game.config.width;
        }
        //make a class level reference to the scene
        this.scene = config.scene;

        //cell width
        this.cw = config.width / config.cols;
        //cell height
        this.ch = config.height / config.rows;
   }

   show() {
    	//add graphics
        this.graphics = this.scene.add.graphics();

        //set a line style
        this.graphics.lineStyle(2, 0xff0000);

        //draw vertical lines
        for (var i = 0; i < this.config.width; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }
        //draw horizontal lines
        for (var i = 0; i < this.config.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);
        }
        this.graphics.strokePath();
    }

    placeAt(xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }

    placeAtIndex(index, obj) {

    	//get the row by dividing the index by the number of columns
    	//and take away everything after the decimal point
          var yy = Math.floor(index / this.config.cols);

          //get the remainder by subtracting row number from the index
          var xx = index - (yy * this.config.cols);

        //call the place at function
        this.placeAt(xx, yy, obj);
    }

    showNumbers() {
        this.show();
        var count = 0;
        for (var i = 0; i < this.config.rows; i++) {
            for (var j = 0; j < this.config.cols; j++) {
                var numText = this.scene.add.text(0, 0, count.toString(), {
                    color: '#ff0000'
                });
                numText.setOrigin(0.5, 0.5);
                this.placeAtIndex(count, numText);
                count++;
            }
        }
    }
}