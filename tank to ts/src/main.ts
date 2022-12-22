import Phaser from 'phaser'
import SceneMain from './scenes/SceneMain';
import SceneLoad from './scenes/sceneLoad';
import SceneOver from './scenes/sceneOver';
import SceneTitle from './scenes/sceneTitle';
import Constants from './constants';
import Model from './classes/mc/model';
import Controller from './classes/mc/controller';

var isMobile = navigator.userAgent.indexOf("Mobile");
if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
}
//
//set initial values
var w = 480;
var h = 640;
//if not a desktop or laptop change the values to match the size of the browser
if (isMobile != -1) {
    w = window.innerWidth;
    h = window.innerHeight;
}
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 480,
    height: 640,
    dom: {
        createContainer: true
    },
    scene: [SceneLoad, SceneTitle,SceneMain,SceneOver],
}
const G = new Constants();
const model = new Model();
// model.isMobile = isMobile;
const game = new Phaser.Game(config);
// window.addEventListener('resize', function (event) {
//     game.resize(window.innerWidth, window.innerHeight);
// }, false);
const emitter = new Phaser.Events.EventEmitter();
const controller = new Controller();
export default game
export {G,model, emitter, controller}