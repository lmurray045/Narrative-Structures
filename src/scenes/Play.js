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
        const namespawn = map.findObject('Sprites', (obj) => obj.name === 'name')   
        const crab1spawn = map.findObject('Sprites', (obj) => obj.name === 'crab_1')
        const crab2spawn = map.findObject('Sprites', (obj) => obj.name === 'crab_2')
        const crab3spawn = map.findObject('Sprites', (obj) => obj.name === 'crab_3')
        const crab4spawn = map.findObject('Sprites', (obj) => obj.name === 'crab_4')
        const crab5spawn = map.findObject('Sprites', (obj) => obj.name === 'crab_5')
        const choicespawn = map.findObject('Sprites', (obj) => obj.name === 'delayed_choice')
        const goodspawn = map.findObject('Sprites', (obj) => obj.name === 'good_tree')
        const badspawn = map.findObject('Sprites', (obj) => obj.name === 'evil_tree')


        //creation
        let words1 = "Hello there Traveler!\nWelcome to Narrativille.\nHere, the narrative methods\ndescribed by Aaron Reed reign\nsupreme! Interact with the\ncharacters here to learn how\nnarrative can be presented in\n5 different ways!"
        this.testText = new Dialouge(this, t1spawn.x, t1spawn.y, 'invis', 0, words1, 10000, 8, false)
        this.testText.onOverlap = true
        this.textGroup.add(this.testText)

        //dialouge trees

        //dictionary
        this.masterDict = {}
        this.masterDict['Samantha Gorman'] = () => {
            let next = 'OK! You will henceforth be known as\nSamantha Gorman!'
            this.next = new Dialouge(this, namespawn.x, namespawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            playerName = 'Samantha'
        }

        this.masterDict['Gamantha Sorman'] = () => {
            let next = 'OK! You will henceforth be known as\nGamantha Sorman!'
            this.next = new Dialouge(this, namespawn.x, namespawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            playerName = 'Gamantha'
        }

        this.masterDict['{-- Good'] = () => {
            let next = 'Really? Didn\'t peg you as the type...'
            this.next = new Dialouge(this, choicespawn.x, choicespawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            playerMoral = 'good'
        }

        this.masterDict['Evil --}'] = () => {
            let next = 'Really? Didn\'t peg you as the type...'
            this.next = new Dialouge(this, choicespawn.x, choicespawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            playerMoral = 'evil'
        }

        this.masterDict['Good Side?'] = () => {
            let next = 'Yea! Here in narrativille\nwe like pickin sides.\nIt\'s sorta our thing...'
            this.next = new Dialouge(this, goodspawn.x, goodspawn.y, 'invis', 0, next, 10000, 8, true, "Why Good?", "Evil Twin?")
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict['Evil Twin?'] = () => {
            let next = 'Yea, I\'m Ronny, and \nthat\'s Donny, my evil twin.\nAlways knew he was\n a bad apple.'
            this.next = new Dialouge(this, goodspawn.x, goodspawn.y, 'invis', 0, next, 10000, 8, true, "Why Good?", "Why the names?")
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict['Why Good?'] = () => {
            let next = 'Dunno. Felt right I guess.\nOr should I say left...'
            this.next = new Dialouge(this, goodspawn.x, goodspawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict['Why the names?'] = () => {
            let next = `Guess Ma thought it was\nfunny. I wouldn\'t be\n laughing with a name like\n${playerName}.`
            this.next = new Dialouge(this, goodspawn.x, goodspawn.y, 'invis', 0, next, 10000, 8, true, "Why Good?", "Evil Twin?")
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict['Why the odd names?'] = () => {
            let next = `Guess Ma thought it was\nfunny. I wouldn\'t be\n laughing with a name like\n${playerName}.`
            this.next = new Dialouge(this, badspawn.x, badspawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict["Who's Ronny?"] = () => {
            let next = `My stupid twin\nbrother. I'm Donny, he's\nRonny.`
            this.next = new Dialouge(this, badspawn.x, badspawn.y, 'invis', 0, next, 10000, 8, true, "Why Evil?", 'Why the odd names?')
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict["Why Evil?"] = () => {
            let next = `Why do you ask\nso many stupid\nquestions? Sorry,\n I didn't mean that.\nI guess I've always\nfelt evil...`
            this.next = new Dialouge(this, badspawn.x, badspawn.y, 'invis', 0, next, 10000, 8, true, "You should eat", "Maybe you're tired")
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict["You should eat"] = () => {
            let next = `Huh.\nNever thought of that...`
            this.next = new Dialouge(this, badspawn.x, badspawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        this.masterDict["Maybe you're tired"] = () => {
            let next = `Huh.\nNever thought of that...`
            this.next = new Dialouge(this, badspawn.x, badspawn.y, 'invis', 0, next, 10000, 8, false)
            this.next.displayText()
            this.next.onOverlap = true
            this.textGroup.add(this.next)
            if(this.next.tree) {
                this.next.dicotomy(this.next.opt1, this.next.opt2, this.masterDict[this.next.opt1], this.masterDict[this.next.opt2], 10)
                this.next.destroy()
            }
        }

        //naming
        let name1 = "One of the most important types\nof narrative is naming!\nWhat's your name traveler?"
        this.name1 = new Dialouge(this, namespawn.x, namespawn.y, 'invis', 0, name1, 10000, 8, true, "Samantha Gorman", "Gamantha Sorman")
        this.name1.onOverlap = true
        this.textGroup.add(this.name1)

        let crab1 = "Another prominent type is called\n'Story Dumps'. Find my 4 other crab\n friends to get some cool narrative\ndumped on you!"
        this.crab1 = new Dialouge(this, crab1spawn.x, crab1spawn.y, 'invis', 0, crab1, 10000, 8, false)
        this.crab1.onOverlap = true
        this.textGroup.add(this.crab1)

        let crab2 = "Most games do this\nwith things like\nnotebooks or scrolls.\nNot this one though!\nWe use crabs!"
        this.crab2 = new Dialouge(this, crab2spawn.x, crab2spawn.y, 'invis', 0, crab2, 10000, 8, false)
        this.crab2.onOverlap = true
        this.textGroup.add(this.crab2)

        let crab3 = "The thing about this\nmethod is that it requires\nthe player to be self\nmotivated to find the\nstory on their own.\n So nothing essential\nallowed!"
        this.crab3 = new Dialouge(this, crab3spawn.x, crab3spawn.y, 'invis', 0, crab3, 10000, 8, false)
        this.crab3.onOverlap = true
        this.textGroup.add(this.crab3)

        let crab4 = "Sorry,\nwere you expecting lore?\nUhhhhh...\nlemme think..."
        this.crab4 = new Dialouge(this, crab4spawn.x, crab4spawn.y, 'invis', 0, crab4, 10000, 8, false)
        this.crab4.onOverlap = true
        this.textGroup.add(this.crab4)

        let crab5 = `If a crab claw closes\nand noone is\naround to hear it...\nOh! Hi there!`
        this.crab5 = new Dialouge(this, crab5spawn.x, crab5spawn.y, 'invis', 0, crab5, 10000, 8, false)
        this.crab5.onOverlap = true
        this.textGroup.add(this.crab5)

        let choice = "Welcome to the crossroads\nof delayed story choice.\nBeware! Your options\neffect what lexia you\nsee in the future!"
        this.choice = new Dialouge(this, choicespawn.x, choicespawn.y, 'invis', 0, choice, 10000, 8, true, "{-- Good", "Evil --}")
        this.choice.onOverlap = true
        this.textGroup.add(this.choice)

        //trees

        let good = "Glad you chose the\ngood side, unlike my\nevil twin over there.\nThat degenerate..."
        this.good = new Dialouge(this, goodspawn.x, goodspawn.y, 'invis', 0, good, 10000, 8, true, "Good Side?", "Evil Twin?", "good")
        this.good.onOverlap = true
        this.textGroup.add(this.good)

        let bad = "Phew! Was worried\nfor a sec that you were\ngonna go with 'ol goodie\ntwo shoes Ronny over\nthere."
        this.bad = new Dialouge(this, badspawn.x, badspawn.y, 'invis', 0, bad, 10000, 8, true, "Who's Ronny?", "Why Evil?", "evil")
        this.bad.onOverlap = true
        this.textGroup.add(this.bad)

        //physics and colliders----------------------------------

        //terrain stuff
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.p1, terrainLayer)

        //player and dialouge zones
        this.physics.add.overlap(this.p1, this.textGroup, (player, obj) => {
            if(Phaser.Input.Keyboard.JustDown(this.KEYS.INTERACT)) {
                obj.displayText()
                if(obj.tree == true){
                    obj.dicotomy(obj.opt1, obj.opt2, this.masterDict[obj.opt1], this.masterDict[obj.opt2], 10)
                    obj.destroy()
                }
            }
        })
        



    }

    update() {
        this.p1.update()
    }

} 