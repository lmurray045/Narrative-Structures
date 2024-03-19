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
        this.box = this.scene.add.bitmapText(this.x, this.y - 20, 'fipps', this.dialouge, this.size, 1).setOrigin(0.5, 1).setAlpha(0)
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

    dicotomy(obj1, obj2, callback1, callback2, tsize, ){
        this.t1 = this.scene.add.dynamicBitmapText(this.x - 20, this.y - 10, 'fipps', obj1, tsize, 1).setOrigin(.5).setInteractive()
        this.t2 = this.scene.add.dynamicBitmapText(this.x + 20, this.y - 10, 'fipps', obj2, tsize, 1).setOrigin(.5).setInteractive()

        //t1 code
        this.t1.on('pointerdown', function (pointer)
        {
            callback1()
        });
        this.t1.on('pointerout', function (pointer)
        {
            this.clearTint();
        });
        this.t1.on('pointerover', function (pointer)
        {
            this.setTint(0x00ff0);
        });

        //t2 code
        this.t2.on('pointerdown', function (pointer)
        {
            callback2()
        });
        this.t2.on('pointerout', function (pointer)
        {
            this.clearTint();
        });
        this.t2.on('pointerover', function (pointer)
        {
            this.setTint(0x00ff0);
        });
    }

    update() {
        
    }

}