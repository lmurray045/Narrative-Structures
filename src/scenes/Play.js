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
        this.p1 = new Player(this, p1spawn.x, p1spawn.y, 'p1sheet', 0).setInteractive()
        //this.cam = this.cameras.add(0, 0, 680, 480)
        this.cameras.main.startFollow(this.p1, false, 1, 1)
        this.p1.body.onOverlap = true

        //text objects-------------------------------------------------

        //group
        this.textGroup = this.add.group()

        //spawns
        const t1spawn = map.findObject('Sprites', (obj) => obj.name === 'text_1')

        //creation
        let words1 = "Hello there Traveler!\nWelcome to Narrativille.\nHere, the narrative methods\ndescribed by Aaron Reed reign\nsupreme! Interact with the\ncharacters here to learn how\nnarrative can be presented in\n5 different ways!"
        this.testText = new Dialouge(this, t1spawn.x, t1spawn.y, 'invis', 0, words1, 15000, 8)
        this.testText.onOverlap = true
        this.textGroup.add(this.testText)

        
        
        //physics and colliders----------------------------------

        //terrain stuff
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.p1, terrainLayer)

        //player and dialouge zones
        this.physics.add.overlap(this.p1, this.textGroup, (player, obj) => {
            if(Phaser.Input.Keyboard.JustDown(this.KEYS.INTERACT)) {
                obj.displayText()
                obj.dicotomy("yes", 'no', () => {
                    console.log("yes")
                },
                () =>
                {
                    console.log("no")
                }, 12)
            }
        })
        



    }

    update() {
        this.p1.update()
    }

} 