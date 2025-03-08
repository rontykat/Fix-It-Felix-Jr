class LoadScene extends Phaser.Scene {
    constructor() { super('LoadScene'); }
    preload() {
        this.load.image('skyscraper', 'assets/skyscraper.png');
        this.load.spritesheet('fixer', 'assets/fixer.jpg', { frameWidth: 36, frameHeight: 50 });
        this.load.spritesheet('crusher', 'assets/crusher.png', { frameWidth: 70, frameHeight: 70 });
        this.load.image('damaged_window', 'assets/damaged_window.png');
        this.load.image('restored_window', 'assets/restored_window.png');
        this.load.audio('theme_music', 'assets/theme_music.mp3');
    }
    create() { this.scene.start('StartScene'); }
}