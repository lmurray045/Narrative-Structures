class Input extends Phaser.Scene {
    constructor() {
        super('inputScene')
    }

    init (data) {
        this.displayText = data
    }

    create() {
        this.box = this.add.image('box')
    }
}