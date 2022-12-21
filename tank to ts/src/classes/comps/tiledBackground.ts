import game from "../../main";
import Align from "../../util/align";

export default class TiledBackground extends Phaser.GameObjects.Group {
    constructor(config) {
        //pass the scene to the parent
        super(config.scene);

        //make a class reference to the scene
        this.scene = config.scene;

        //make a class reference to the key
        this.key = config.key;

        //make a row position variable set to 0
        this.yy = 0;

        //make a column position variable set to 0
        this.xx = 0;

        //add the first tile
        this.addTile();
    }
    addTile() {
        //make a new tile
        var tile = this.scene.add.image(this.xx, this.yy, this.key);

        //scale the tile to 20% of the game's width
        Align.scaleToGameW(tile,.2);

        //add the tile to the group
        this.add(tile);

        //update the column position by the displayWidth of the tile
        this.xx += tile.displayWidth;

        //if the next tile would go off the screen
        //then advance the row position by the displayHeight
        //and reset the column position to zero
        if (this.xx > game.config.width + tile.displayWidth) {
            this.yy += tile.displayHeight;
            this.xx = 0;
        }
        
        //if the next tile will not go past the game's height
        //then we have not filled the screen yet
        //so the function will call itself again
        if (this.yy < (game.config.height as number + tile.displayHeight)) {
            this.addTile();
        }
    }
}