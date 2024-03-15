class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {

    }

    create() {
        console.log("Play Scene")
        
        //tilemap creation
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage("AllAssetsPreview", "tilesetImage")
        const bgLayer = map.createLayer("Background", tileset)
        const terrainLayer = map.createLayer("Terrain", tileset)
        const objectLayer = map.createLayer("Objects", tileset)

        //collision
        //terrainLayer.setCollisionByProperty({collides: true})
        objectLayer.setCollisionByProperty({collides: true})

        //camera bounds
        //this.cameras.main.setViewport(0, 0, 680, 480)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)



        //add p1
        const p1spawn = map.findObject('Sprites', (obj) => obj.name === 'Player One')

        //p1 keys
        this.KEYS = this.scene.get('keyScene').KEYS
    

        //players
        this.p1 = new Player(this, p1spawn.x, p1spawn.y, 'p1sheet', 0)
        //this.cam = this.cameras.add(0, 0, 680, 480)
        this.cameras.main.startFollow(this.p1, false, 1, 1)

        
        
        //physics and colliders----------------------------------

        //terrain stuff
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.p1, terrainLayer)


    }

    update() {
        this.p1.update()
    }

} 