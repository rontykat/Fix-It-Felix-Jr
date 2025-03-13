class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene");
    }

    preload() {
        this.load.audio("select", "./assets/audio/click.wav");
    }

    create() {
        // font
        const textStyle = {
            font: "20px Courier New",
            fill: "#ff0000",
            align: "center"
        };

        // instructions/credits
        const instructions = [
            { y: 50, text: "INSTRUCTIONS" },
            { y: 150, text: "Left and Right Arrows >>> Move Left & Right" },
            { y: 200, text: "Up Arrow >>> Jump" },
            { y: 250, text: "Down Arrow >>> Drop" },
            { y: 300, text: "Space Button >>> Fix Window" },
            { y: 400, text: "3 LIVES, DON'T GET HIT BY THE BRICKS!" },
            { y: 500, text: "CREDITS" },
            { y: 550, text: "VISUALS & AUDIO: deviantart.com, spriters-resource.com" },
            { y: 575, text: "online-image-editor.com, freesound.org" },
            { y: 700, text: "PRESS UP ARROW TO RETURN TO MENU" }
        ];

        instructions.forEach(instr => {
            this.add.text(centerX, instr.y, instr.text, textStyle).setOrigin(0.5);
        });

        this.selectSound = this.sound.add("select", { volume: 0.5 });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.selectSound.play();
            this.scene.start("StartScene");
        }
    }
}