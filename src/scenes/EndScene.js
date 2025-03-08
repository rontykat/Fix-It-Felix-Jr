class EndScene extends Phaser.Scene {
    constructor() { super('EndScene'); }
    create() {
        this.add.text(350, 280, 'Game Over', { fontSize: '36px', fill: '#ff0000' });
        this.add.text(370, 340, 'Press R to Retry', { fontSize: '20px', fill: '#ffffff' });
        this.input.keyboard.on('keydown-R', () => this.scene.start('GameplayScene'));
    }
}