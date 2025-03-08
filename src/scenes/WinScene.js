class WinScene extends Phaser.Scene {
    constructor() { super('WinScene'); }
    create() {
        this.add.text(350, 280, 'Victory!', { fontSize: '36px', fill: '#00ff00' });
        this.add.text(370, 340, 'Press ENTER to Play Again', { fontSize: '20px', fill: '#ffffff' });
        this.input.keyboard.on('keydown-ENTER', () => this.scene.start('GameplayScene'));
    }
}
