class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('tilesetImage', 'AllAssetsPreview.png')
        this.load.image('fade', 'fade.png')
        this.load.spritesheet('playerSheet', 'AnimationSheet.png', {
            frameWidth: 24,
            frameHeight: 24,
            startFrame: 0,
            endFrame: 41
        })

        this.load.spritesheet('invis', 'invis.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 0
        })

        this.load.tilemapTiledJSON('tilemapJSON', 'tilemap.json')

    }

    create() {

        //p1 Animations-------------------------------------------

        this.anims.create({
            key: "idle",
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 0,
                end: 1
            })
        })

        this.anims.create({
            key: "player-walk",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 8,
                end: 11
            })
        })


        this.anims.create({
            key: "player-push",
            repeat: 16,
            frameRate: 19,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 16,
                end: 19
            })
        })

        this.anims.create({
            key: "player-jump",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 24,
                end: 31
            })
        })

        this.anims.create({
            key: "player-win",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 32,
                end: 35
            })
        })

        this.anims.create({
            key: "player-die",
            repeat: 0,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 36,
                end: 39
            })
        })

        this.anims.create({
            key: "player-sit",
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('playerSheet', {
                start: 41,
                end: 41
            })
        })

    }

    update() {
        //go to play
        this.scene.start("playScene")
    }
}