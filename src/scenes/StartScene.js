class StartScene extends Phaser.Scene {
    constructor() { super('StartScene'); }
    create() {
        this.add.text(350, 180, 'Window Fixer Pro', { fontSize: '36px', fill: '#ffffff' });
        this.add.text(370, 280, 'Press ENTER to Begin', { fontSize: '20px', fill: '#ffffff' });
        this.input.keyboard.on('keydown-ENTER', () => this.scene.start('GameplayScene'));
    }
}