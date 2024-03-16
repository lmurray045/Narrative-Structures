class Dialouge extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, words, time, size) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setImmovable(true)
        this.time = time
        this.dialouge = words
        this.scene = scene
        this.x = x
        this.y = y
        this.size = size
    }

    displayText() {
        this.box = this.scene.add.bitmapText(this.x, this.y - 10, 'dogica_font', this.dialouge, this.size, 1).setOrigin(0.5, 1).setAlpha(0)
        this.boxTween = this.scene.tweens.chain({
            targets: this.box,
            loop: 0,
            tweens:[
                {
                    alpha: {from: 0, to: 1},
                    duration: 500
                },
                {
                    alpha: {from: 1, to: 1},
                    duration: this.time
                },
                {
                    alpha: {from: 1, to: 0},
                    duration: 500,
                    onComplete: () => {
                        this.box.destroy()
                    }
                },
            ]
        })
    }

    update() {
        
    }

}