class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.bitmapFont('dogica_font', 'assets/fonts/dogica.png', 'assets/fonts/dogica.xml')
        this.load.bitmapFont('dogica_reg_font', 'assets/fonts/dogica_reg.png', 'assets/fonts/dogica_reg.xml')
        this.load.bitmapFont('fipps', 'assets/fonts/Fipps.png', 'assets/fonts/Fipps.xml')
        this.load.audio('music', 'assets/music.mp3')
        this.load.audio('menuclick', 'assets/menuclick.mp3')
    }

    create() {

        //steal inputs from Keys Scene
        this.KEYS = this.scene.get('keyScene').KEYS

        this.sound.stopAll()
        this.music = this.sound.add('music', {
            loop: true,
            volume: 0.5
        })
        this.music.play()

        // add title text
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 32, 'dogica_font', ' Narrative\nStructures', 20).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 32, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 60, 'dogica_font', 'Press P for Player Controls', 7).setOrigin(0.5)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.SPACE)){
            this.scene.start('loadScene')
            this.sound.play('menuclick')
        }
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_P)){
            this.scene.start('controlScene')
            this.sound.play('menuclick')
        }
    }
}
