class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {
        this.loadAssets();
    }

    create() {
        this.displayGameOverScreen();
        this.setupInput();
    }

    update() {
        if (this.isSpacePressed()) {
            this.restartGame();
        }
    }

    loadAssets() {
        this.load.image("loser", "./assets/img/loser.png"); 
        this.load.audio("select", "./assets/audio/click.wav");
    }

    displayGameOverScreen() {

        this.add.image(centerX, centerY - 100, "loser").setOrigin(0.5).setScale(1.2);

        const textStyle = {
            font: "80px Courier New",
            fill: "#ff0000",
            align: "center"
        };

        const smallTextStyle = {
            font: "50px Courier New",
            fill: "#ffffff",
            align: "center"
        };

        this.add.text(centerX, centerY + 200, "TRY AGAIN", textStyle).setOrigin(0.5);
        this.add.text(centerX, centerY + 270, "SPACE TO RESTART", smallTextStyle).setOrigin(0.5);

        this.selectSound = this.sound.add("select", { volume: 0.5 });
    }

    setupInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    isSpacePressed() {
        return Phaser.Input.Keyboard.JustDown(this.cursors.space);
    }

    restartGame() {
        this.selectSound.play();
        this.input.keyboard.resetKeys();
        this.scene.start("StartScene");
    }
}