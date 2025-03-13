class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }

    preload() {
        const assets = [
            { type: "image", key: "logo", path: "./assets/img/logo.png" },
            { type: "audio", key: "select", path: "./assets/audio/click.wav" }
        ];

        assets.forEach(asset => {
            if (asset.type === "image") this.load.image(asset.key, asset.path);
            else if (asset.type === "audio") this.load.audio(asset.key, asset.path);
        });
    }

    create() {
        // logo
        this.add.image(centerX, centerY - 50, "logo").setOrigin(0.5).setScale(3.8);

        const textStyle = {
            font: "35px Courier New", // Retro font
            fill: "#ff0000",
            align: "center"
        };

        const textData = [
            { y: centerY + 200, message: "SPACE >>> Start Game" },
            { y: centerY + 240, message: "UP >>> Instructions & Credits" }
        ];

        textData.forEach(txt => {
            this.add.text(centerX, txt.y, txt.message, textStyle).setOrigin(0.5);
        });

        this.selectSound = this.sound.add("select", { volume: 0.5 });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.selectSound.play();
            
            this.time.delayedCall(100, () => {  
                this.scene.start("GameplayScene");
            });
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectSound.play();
            this.scene.start("LoadScene");
        }
    }
}