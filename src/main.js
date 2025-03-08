const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: [LoadScene, StartScene, GameplayScene, EndScene, WinScene]
};

const game = new Phaser.Game(config);