class Controls extends Phaser.Scene {
    constructor() {
        super('controlScene')
    }
    
    preload() {
        this.load.spritesheet('playerSheet', 'assets/AnimationSheet.png', {
            frameWidth: 24,
            frameHeight: 24,
            startFrame: 0,
            endFrame: 41
        })

    }

    create() {

        this.anims.create({
            key: "player-walk",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 8,
                end: 11
            })
        })

        //steal inputs from Keys Scene
        this.KEYS = this.scene.get('keyScene').KEYS

        // add title text
        this.add.bitmapText(game.config.width / 2, (game.config.height) - 10, 'dogica_font', 'Press R to return to Menu', 8).setOrigin(0.5)
        //this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5)

        this.p1 = this.add.sprite(game.config.width / 2, game.config.height / 2, 'playerSheet', 0).setOrigin(.5)

        this.p1.setScale(2)

        this.p1.anims.play('player-walk', true)

        //p1 text
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 60, 'dogica_reg_font', 'A / D: Left/Right\n\nW / S: Up/Down\n\nE: Interact\n\nMouse click to choose dialouge', 9, 1).setOrigin(0.5)

        //p1 text
        this.add.bitmapText(game.config.width / 2, (3 * game.config.height / 4), 'dogica_reg_font', 'You can talk to characters and signs!', 9, 1).setOrigin(0.5)

        //p2 text
        //this.add.bitmapText(3* game.config.width / 4, (3 * game.config.height / 4) - 60, 'dogica_reg_font', '{- / -}: Left/Right\n\nUp Arrow: Jump\n\nSHIFT: Shoot', 9 , 1).setOrigin(0.5)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_R)){
            this.scene.start('menuScene')
        }
    }
}