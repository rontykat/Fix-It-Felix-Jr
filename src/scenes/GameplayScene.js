class GameplayScene extends Phaser.Scene {
    constructor() { super('GameplayScene'); }

    create() {
        this.add.image(450, 350, 'skyscraper'); // Background

        this.music = this.sound.add('theme_music', { volume: 0.5, loop: true });
        this.music.play();

        // Add platforms (static objects that Felix can land on)
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(450, 500, 'platform').setScale(2).refreshBody(); // Middle platform
        this.platforms.create(250, 600, 'platform').setScale(2).refreshBody(); // Left platform
        this.platforms.create(650, 600, 'platform').setScale(2).refreshBody(); // Right platform

        // Add Felix
        this.felix = this.physics.add.sprite(450, 400, 'fixer');
        this.felix.setCollideWorldBounds(true); // Prevent Felix from falling out of bounds

        // Make Felix collide with platforms
        this.physics.add.collider(this.felix, this.platforms);

        // Windows (group of objects Felix can fix)
        this.windows = this.physics.add.staticGroup();
        this.windows.create(400, 350, 'damaged_window'); // Middle window
        this.windows.create(320, 450, 'damaged_window'); // Left window
        this.windows.create(480, 450, 'damaged_window'); // Right window
        this.windows.create(400, 550, 'damaged_window'); // Bottom middle window

        // Ralph (enemy at the top)
        this.ralph = this.add.sprite(450, 100, 'crusher');

        // Bricks (projectiles)
        this.bricks = this.physics.add.group();

        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => this.throwBrick()
        });

        // Collisions
        this.physics.add.collider(this.felix, this.bricks, this.hitByBrick, null, this);

        // Allow Felix to fix windows
        this.input.keyboard.on('keydown-SPACE', () => {
            this.fixWindow();
        });

        // Add player movement controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    throwBrick() {
        let brick = this.bricks.create(this.ralph.x, this.ralph.y + 20, 'brick'); // Ensure it spawns below Ralph
        brick.setScale(2);  // Make sure the brick is visible
        brick.setVelocityY(200);
        brick.setCollideWorldBounds(false);
    }
    
    hitByBrick(felix, brick) {
        brick.destroy();
        console.log("Felix got hit!");
    }

    fixWindow() {
        let closeWindows = this.windows.getChildren().filter(window => 
            Phaser.Math.Distance.Between(this.felix.x, this.felix.y, window.x, window.y) < 50
        );
    
        if (closeWindows.length > 0) {
            let windowToFix = closeWindows[0];
            windowToFix.setTexture('restored_window'); // Change texture to fixed window
        }
    }

    update() {
        if (this.cursors.left.isDown) {
            this.felix.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.felix.setVelocityX(160);
        } else {
            this.felix.setVelocityX(0);
        }

    // Fix jumping issue by checking if Felix is on a platform
    if (this.cursors.up.isDown && this.felix.body.blocked.down) {
        this.felix.setVelocityY(-330); // Jumping power
        }
    }
}