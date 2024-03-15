class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        this.setImmovable(true)

        //properties
        this.PLAYER_VELOCITY = 100

        console.log('player creation')

        this.KEYS = scene.KEYS
        console.log('player creation 2')
        console.log(`keys: ${this.keys}`)
    }

    update() {
        //CODE CITATION: this movement code is taken from Nathan Altices CMPM 120 code example "Beyond Orthogonal"
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        if(!(this.KEYS.LEFT.isDown || this.KEYS.RIGHT.isDown || this.KEYS.UP.isDown || this.KEYS.DOWN.isDown)) {
            this.anims.play('idle', true)
            this.body.setVelocity(0)
        }
        else {
            //animation
            this.anims.play("player-walk", true)

            //handle left/rightad
            if(this.KEYS.LEFT.isDown) {
                playerVector.x = -1
                playerDirection = 'left'
                this.flipX = true
            } else if(this.KEYS.RIGHT.isDown) {
                playerVector.x = 1
                playerDirection = 'right'
                this.flipX = false
            }

            //handle up/down
            if(this.KEYS.UP.isDown) {
                playerVector.y = -1
                playerDirection = 'up'
            } else if(this.KEYS.DOWN.isDown) {
                playerVector.y = 1
                playerDirection = 'down'
            }

            playerVector.normalize()

            this.body.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
        }
    }

}