class GameplayScene extends Phaser.Scene {
    constructor() {
        super("GameplayScene");
        
        this.playerlives = 3;
        this.lifeIcons = [];
    }

    preload() {
        this.load.image('window_floor',     './assets/img/window_floor.png');
        this.load.image('door_floor',    './assets/img/door_floor.png');        
        this.load.image('background',     './assets/img/background.png');
        this.load.image('icon',     './assets/img/icon.png');
        this.load.image('door',         './assets/img/door.png');
        this.load.image('brick',        './assets/img/brick.png');

        this.load.spritesheet('window', './assets/img/window.png', { 
            frameWidth: 32, frameHeight: 48 
        });

        this.load.spritesheet('ralph', './assets/img/ralph.png', { 
            frameWidth: 64, frameHeight: 64 
        });

        this.load.spritesheet('felix', './assets/img/felix.png', { 
            frameWidth: 48, frameHeight: 48 
        });

        this.load.audio('glide',           './assets/audio/glide.wav');
        this.load.audio('success',       './assets/audio/success.wav');
        this.load.audio('backgroundmusic','./assets/audio/bgmusic.wav');
        this.load.audio('lost',       './assets/audio/lost.wav');
        this.load.audio('win',        './assets/audio/win.wav');
        this.load.audio('music',          './assets/audio/bgmusic.wav');
    }


    create() {

        this.playerlives = 3; 
        this.updateLifeIcons();

        const bgElements = [
            { x: 400, y: 431, key: 'background', scale: 2.5 },
            { x: 400, y: 620, key: 'door', scale: 2.5 }
        ];
        bgElements.forEach(el => this.add.image(el.x, el.y, el.key).setScale(el.scale));

        // background music 
        this.music = this.sound.add('music', { loop: true, volume: 0.3 });
        this.music.play();

        this.input.keyboard.resetKeys();


        // ralph at top
        this.npc = this.add.sprite(centerX, 106, 'ralph', 5).setScale(1.75);
        this.anims.create({
            key: 'wreck',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ralph', { frames: [5, 6, 7, 8, 9, 6, 7, 8, 9, 5] })
        });

        // different types of window conditions
        const windowStates = {
            fixed: [0],
            halfbroken: [1],
            broken: [2]
        };
        Object.entries(windowStates).forEach(([key, frame]) => {
            this.anims.create({
                key: key,
                frameRate: 1,
                frames: this.anims.generateFrameNumbers('window', { frames: frame })
            });
        });

        this.windowGroup = this.physics.add.staticGroup();

        const windowLayout = [
            { x: 400, y: 273, state: 'halfbroken' }, { x: 225, y: 273, state: 'halfbroken' },
            { x: 300, y: 273, state: 'broken' }, { x: 500, y: 273, state: 'halfbroken' },
            { x: 575, y: 273, state: 'halfbroken' }, { x: 400, y: 373, state: 'halfbroken' },
            { x: 225, y: 373, state: 'halfbroken' }, { x: 300, y: 373, state: 'broken' },
            { x: 500, y: 373, state: 'halfbroken' }, { x: 575, y: 373, state: 'broken' },
            { x: 225, y: 488, state: 'halfbroken' }, { x: 300, y: 488, state: 'broken' },
            { x: 500, y: 488, state: 'halfbroken' }, { x: 575, y: 488, state: 'halfbroken' },
            { x: 225, y: 588, state: 'halfbroken' }, { x: 300, y: 588, state: 'broken' },
            { x: 500, y: 588, state: 'halfbroken' }, { x: 575, y: 588, state: 'broken' }
        ];
        
        windowLayout.forEach(w => this.addwindow(w.x, w.y, w.state));


        // felix (main player)
        this.player = this.physics.add.sprite(650, 700, 'felix', 0);
        this.player.setScale(1.5).setSize(20, 34);

        // sound effects for each action
        this.jumpsound = this.sound.add('glide');
        this.jumpsound.setVolume(0.5);

        this.fixsound = this.sound.add('success');
        this.fixsound.setVolume(0.5);

        this.gameoversound = this.sound.add('lost');
        this.gameoversound.setVolume(0.5);

        this.victorysound = this.sound.add('win');
        this.victorysound.setVolume(0.5);

        // physics
        this.physics.world.setBounds(0, 0, 800, 700);
        this.player.setCollideWorldBounds(true);
        this.player.body.onOverlap = true;

        // felix anims
        let animations = [
            { key: 'idle', frameRate: 5, frames: { start: 0, end: 0 } },
            { key: 'glide', frameRate: 2, repeat: false, frames: { start: 1, end: 0 } },
            { key: 'fix', frameRate: 5, frames: { frames: [0, 4, 0] } }
        ];

        animations.forEach(anim => {
            this.anims.create({
                key: anim.key,
                frameRate: anim.frameRate,
                frames: this.anims.generateFrameNumbers('felix', anim.frames),
                repeat: anim.repeat || undefined
            });
        });


        // floors
        this.platforms = this.physics.add.staticGroup();
        
        const platformPositions = {
            fourthLevel:  [ [400, 310], [225, 310], [300, 310], [500, 310], [575, 310] ],
            thirdLevel:   [ [400, 410], [225, 410], [300, 410], [500, 410], [575, 410] ],
            secondLevel:  [ [400, 535, 'door_floor', 2.5], [225, 525], [300, 525], [500, 525], [575, 525] ],
            firstLevel:   [ [225, 625], [300, 625], [500, 625], [575, 625] ]
        };

        Object.values(platformPositions).forEach(level => {
            level.forEach(([x, y, key = 'window_floor', scale = 2]) => {
                this.platforms.create(x, y, key).setScale(scale).refreshBody().body.checkCollision.down = false;
            });
        });

        // bricks
        this.bricks = this.physics.add.group();

        this.spawnBrickTimer = this.time.addEvent({
            delay: 2500,
            loop: true,
            callback: () => {
                this.npc.anims.play('wreck');
                this.time.delayedCall(500, () => this.createBricks());
            }
        });

        // physics
        this.physics.add.overlap(this.player, this.window, this.handleWindowInteraction, null, this);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.window);
        this.physics.add.collider(this.player, this.bricks, this.handleBrickCollision, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.lifeIcon = this.add.sprite(1000, 1000, 'icon').setScale(2);
        
        this.updateLifeIcons()
    }

    update() {
        // left/right
        let moveSpeed = 160;
        this.player.setVelocityX(
            this.cursors.left.isDown ? -moveSpeed :
            this.cursors.right.isDown ? moveSpeed : 0
        );

        // drop
        this.player.body.checkCollision.down = !this.cursors.down.isDown;

        // jump
        if (this.cursors.up.isDown) {
            if (this.player.body.onFloor()) {
                this.jumpsound.play();
                this.player.setVelocityY(-330);
                this.player.anims.play('glide', true);
            }
        }

        // window fix
        if (this.cursors.space.isDown) {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.interactWithWindow();
            }
            this.fixsound.play();
            this.player.anims.play('fix', true);
        }

        // loser
        if (this.playerlives <= 0) {
            this.endGame("EndScene", this.gameoversound);
        }

        // winner
        if (this.checkForVictory()) {
            this.endGame("WinScene", this.victorysound);
        }
    }

    endGame(sceneKey, soundEffect) {
        this.music.stop();
        soundEffect.play();
        this.scene.start(sceneKey);
    }

    addwindow(x, y, initialState) {
        let newWin = this.windowGroup.create(x, y, 'window').setScale(2);
        newWin.anims.play(initialState);
        return newWin;
    }

    interactWithWindow() {
        let overlapping = this.windowGroup.getChildren().filter(w => this.physics.overlap(this.player, w));

        if (overlapping.length > 0) {
            let activeWin = overlapping[0];

            switch (activeWin.anims.currentAnim.key) {
                case 'fixed':
                case 'halfbroken':
                    activeWin.anims.play('fixed');
                    break;
                case 'broken':
                    activeWin.anims.play('halfbroken');
                    break;
            }
        }
    }

    handleWindowInteraction(player, window) {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.interactWithWindow();
        }
    }

    // felix's lives
    updateLifeIcons() {
        this.lifeIcons.forEach(life => life.destroy());
        this.lifeIcons = [];

        let startX = 785, startY = 15, spacing = 1, iconWidth = 40;

        for (let i = 0; i < this.playerlives; i++) {
            let life = this.add.sprite(startX - i * (spacing + iconWidth), startY, 'icon').setScale(2);
            this.lifeIcons.push(life);
        }
    }

    loseLife() {
        this.playerlives--;
        this.updateLifeIcons();
    }

    // bricks
    createBricks() {
        const xPositions = [225, 300, 400, 500, 575];
        let x = xPositions[Phaser.Math.RND.integerInRange(0, xPositions.length - 1)];

        let brick = this.bricks.create(x, 175, 'brick').setScale(2);
        brick.body.setVelocityY(75);
        brick.body.allowGravity = false;
    }

    handleBrickCollision(player, brick) {
        this.loseLife();
        brick.destroy();
    }

    checkForVictory() {
        let allFixed = true;
        this.windowGroup.getChildren().forEach(window => {
            if (window.anims.currentAnim.key !== 'fixed') {
                allFixed = false;
            }
        });
        return allFixed;
    }
}