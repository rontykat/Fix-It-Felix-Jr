class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    preload() {
        this.load.image("winner", "./assets/img/winner.png");
        this.load.audio("select", "./assets/audio/click.wav");
    }

    create() {
        this.add.image(centerX, 350, "winner").setScale(.6);

        const textStyle = {
            font: "80px Courier New", 
            fill: "#ff0000",
            align: "center"
        };

        const smallTextStyle = {
            font: "40px Courier New", 
            fill: "#ff0000",
            align: "center"
        };

        this.add.text(centerX, 125, "YOU DID IT", textStyle).setOrigin(0.5);
        this.add.text(centerX, 600, "SPACE>>> Restart", smallTextStyle).setOrigin(0.5);

        this.selectSound = this.sound.add("select", { volume: 0.5 });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.selectSound.play();
            this.scene.start("StartScene"); // Restart properly
        }
    }
}