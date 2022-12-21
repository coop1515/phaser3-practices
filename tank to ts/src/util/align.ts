import game from './../main';

export default class Align {
    static scaleToGameW(obj: any, per : any) {
        obj.displayWidth = game.config.width as number * per;
        obj.scaleY = obj.scaleX;
    }
    static centerH(obj :any) {
        obj.x = game.config.width as number / 2;
    }
    static centerV(obj:any) {
        obj.y = game.config.height as number / 2;
    }
    static center(obj:any) {
        obj.x = game.config.width as number / 2;
        obj.y = game.config.height as number / 2;
    }
}