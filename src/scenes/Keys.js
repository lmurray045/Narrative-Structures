class Keys extends Phaser.Scene {
    constructor() {
        super('keyScene')
    }

    init() {
        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            UP: KeyCodes.W,
            LEFT: KeyCodes.A,
            DOWN: KeyCodes.S,
            RIGHT: KeyCodes.D,
            INTERACT: KeyCodes.E,

            MENU_C: KeyCodes.C,
            MENU_P: KeyCodes.P,
            MENU_R: KeyCodes.R,
            MENU_M: KeyCodes.M,
            SPACE: KeyCodes.SPACE
        })
    }

    create() {
        this.scene.launch('menuScene')
    }
}