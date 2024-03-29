//Liam Murray
//Narrative Structures
//Description:
    //a demo of all the narrative structures described by Aaron Reed
//total hours: 30
//Citations: 
    ///KEY SCENE UNDERLAY
        //the method of creating a key scene underlay was taken from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6


let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            //gravity: { y: 1000 }
        }
    },
    zoom: 2,
    width: 288,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Keys, Menu, Controls, Play, Load]
}

let game = new Phaser.Game(config)

let cursors

let playerName = "player"
let playerMoral = 'wawa'

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3