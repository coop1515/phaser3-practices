import Phaser from 'phaser';

const Random = Phaser.Math.Between;
const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    rexUI: any;
    print: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { 
        this.rexUI = this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }

    create() {
        var scrollMode = 0; // 0:vertical, 1:horizontal
        var gridTable = this.rexUI.add.gridTable({
            x: 200,
            y: 300,
            width: (scrollMode === 0) ? 300 : 420,
            height: (scrollMode === 0) ? 420 : 300,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: (scrollMode === 0) ? undefined : 60,
                cellHeight: (scrollMode === 0) ? 60 : undefined,

                columns: 5,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            // slider: {
            //     track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            //     thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            // },
          
            // mouseWheelScroller: {
            //     focus: false,
            //     speed: 0.1
            // },

            header: this.rexUI.add.label({
                width: (scrollMode === 0) ? undefined : 30,
                height: (scrollMode === 0) ? 30 : undefined,

                orientation: scrollMode,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, '창고'),
            }),

            // footer: GetFooterSizer(this, scrollMode),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,
                        orientation: scrollMode,
                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                        text: scene.add.text(0, 0, ''),

                        space: {
                            icon: 10,
                            left: (scrollMode === 0) ? 15 : 0,
                            top: (scrollMode === 0) ? 0 : 15,
                        }
                    });
                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('text').setText(item.id); // Set text of text object
                // console.log("zzz",cell)
                cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                return cellContainer;
            },
            // items:CreateItems(100)
        })
            .layout()
        // console.log(gridTable,"하하하")
        let data=[{
            id:0,
            color:""
        }]
        var gridTable2 = this.rexUI.add.gridTable({
                x: 600,
                y: 300,
                width: (scrollMode === 0) ? 300 : 420,
                height: (scrollMode === 0) ? 420 : 300,
    
                scrollMode: scrollMode,
    
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),
    
                table: {
                    cellWidth: (scrollMode === 0) ? undefined : 60,
                    cellHeight: (scrollMode === 0) ? 60 : undefined,
    
                    columns: 5,
    
                    mask: {
                        padding: 2,
                    },
    
                    reuseCellContainer: true,
                },
    
                // slider: {
                //     track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                //     thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                // },
              
                // mouseWheelScroller: {
                //     focus: false,
                //     speed: 0.1
                // },
    
                header: this.rexUI.add.label({
                    width: (scrollMode === 0) ? undefined : 30,
                    height: (scrollMode === 0) ? 30 : undefined,
    
                    orientation: scrollMode,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, '인벤토리'),
                }),
    
                // footer: GetFooterSizer(this, scrollMode),
    
                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
    
                    table: 10,
                    header: 10,
                    footer: 10,
                },
    
                createCellContainerCallback: (cell, cellContainer) => {
                
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    console.log("item", cell.item)
                   
                    if (cellContainer === null) {
                        cellContainer = scene.rexUI.add.label({
                            width: width,
                            height: height,
                            orientation: scrollMode,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                            item: item,
                            text: scene.add.text(0, 0, ''),
                            space: {
                                icon: 10,
                                left: (scrollMode === 0) ? 15 : 0,
                                top: (scrollMode === 0) ? 0 : 15,
                            }
                            
                        });
                        data.push({id: parseInt(item.id), color : item.color})
                        console.log(cell.index + ': create new cell-container');
                    } else {
                        console.log(cell.index + ': reuse cell-container');
                    }
    
                    // Set properties from item value
                    cellContainer.setMinSize(width, height); // Size might changed in this demo
                    // cellContainer.getElement('text').setText(item.id); // Set text of text object
                    cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                    cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                    
                    return cellContainer;
                },
                items: CreateItems(100)
            })
                .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        this.print = this.add.text(0, 0, '');
        gridTable2
            // .on('cell.down', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'pointer-down ' + cellIndex + ': ' + cellContainer.text + '\n';
            // }, this)
            // .on('cell.up', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'pointer-up ' + cellIndex + ': ' + cellContainer.text + '\n';
            // }, this)
            // .on('cell.over', function (cellContainer, cellIndex, pointer) {
            //     cellContainer.getElement('background')
            //         .setStrokeStyle(2, COLOR_LIGHT)
            //         .setDepth(1);
            // }, this)
            // .on('cell.out', function (cellContainer, cellIndex, pointer) {
            //     cellContainer.getElement('background')
            //         .setStrokeStyle(2, COLOR_DARK)
            //         .setDepth(0);
            // }, this)
            .on('cell.click', function (cellContainer, cellIndex, pointer) {
                this.print.text = 'click ' + cellIndex + ': ' + cellContainer.text + '\n';
                // console.log("cellCont", cellIndex)
                // console.log("data",data)
                console.log("grid", gridTable)
                // if(parseInt(data.id) === cellIndex){
                gridTable.setItems(data);
                // }

                var nextCellIndex = cellIndex + 1;
                var nextItem = gridTable2.items[nextCellIndex];
                if (!nextItem) {
                    return;
                }
                nextItem.color = 0xffffff - nextItem.color;
                gridTable2.updateVisibleCell(nextCellIndex);
            }, this)

            // .on('cell.1tap', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += '1 tap (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.2tap', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += '2 taps (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.pressstart', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'press-start (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.pressend', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'press-end (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.swiperight', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'swipe-right (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.swipeleft', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'swipe-left (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.swipeup', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'swipe-up (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)
            // .on('cell.swipedown', function (cellContainer, cellIndex, pointer) {
            //     this.print.text += 'swipe-down (' + cellIndex + ': ' + cellContainer.text + ')\n';
            // }, this)      
      
        this.add.text(800, 600, 'Reset item')
            .setOrigin(1, 1)
            .setInteractive()
            .on('pointerdown', function () {
                var itemCount = Random(10, 50);
                gridTable2
                    .setItems(CreateItems(itemCount))
                    .scrollToTop()
                // console.log(`Create ${itemCount} items`)
            })
    }

    update() { }
}
var data:any = [];
var CreateItems = function (count) {
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
}

var CreateWarehouse = function (cellIndex) {
    var scrollMode = 0;
    this.rexUI.add.gridTable({
        x: 200,
        y: 300,
        width: (scrollMode === 0) ? 300 : 420,
        height: (scrollMode === 0) ? 420 : 300,

        scrollMode: scrollMode,

        background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

        table: {
            cellWidth: (scrollMode === 0) ? undefined : 60,
            cellHeight: (scrollMode === 0) ? 60 : undefined,

            columns: 5,

            mask: {
                padding: 2,
            },

            reuseCellContainer: true,
        },

        // slider: {
        //     track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
        //     thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        // },
      
        // mouseWheelScroller: {
        //     focus: false,
        //     speed: 0.1
        // },

        header: this.rexUI.add.label({
            width: (scrollMode === 0) ? undefined : 30,
            height: (scrollMode === 0) ? 30 : undefined,

            orientation: scrollMode,
            background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
            text: this.add.text(0, 0, '창고'),
        }),

        // footer: GetFooterSizer(this, scrollMode),

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,

            table: 10,
            header: 10,
            footer: 10,
        },

        createCellContainerCallback: function (cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item,
                index = cell.index;
            if (cellContainer === null) {
                cellContainer = scene.rexUI.add.label({
                    width: width,
                    height: height,

                    orientation: scrollMode,
                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                    // icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                    text: scene.add.text(0, 0, ''),

                    space: {
                        icon: 10,
                        left: (scrollMode === 0) ? 15 : 0,
                        top: (scrollMode === 0) ? 0 : 15,
                    }
                });
                // console.log(cell.index + ': create new cell-container');
            } else {
                // console.log(cell.index + ': reuse cell-container');
            }

            // Set properties from item value
            cellContainer.setMinSize(width, height); // Size might changed in this demo
            // cellContainer.getElement('text').setText(item.id); // Set text of text object
            // console.log("zzz",cell)
            // cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
            cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
            return cellContainer;
        },
        items: CreateItems(100)
    })
        .layout()
}


var GetFooterSizer = function (scene, orientation) {
    return scene.rexUI.add.sizer({
        orientation: orientation
    })
        .add(
            CreateFooterButton(scene, 'Reset', orientation),   // child
            1,         // proportion
            'center'   // align
        )
        .add(
            CreateFooterButton(scene, 'Exit', orientation),    // child
            1,         // proportion
            'center'   // align
        )
}

var CreateFooterButton = function (scene, text, orientation) {
    return scene.rexUI.add.label({
        height: (orientation === 0) ? 40 : undefined,
        width: (orientation === 0) ? undefined : 40,
        orientation: orientation,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
        text: scene.add.text(0, 0, text),
        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        align: 'center',
        space: {           
            icon: 10
        }
    })
        .setInteractive()
        .on('pointerdown', function () {
            console.log(`Pointer down ${text}`)
        })
        .on('pointerover', function(){
            this.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('pointerout', function(){
            this.getElement('background').setStrokeStyle();
        })  
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);