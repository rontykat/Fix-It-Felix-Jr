// Ronitt Katkoria
// Make the Fake Final Project
// Fix It Felix Jr
// 35-40 hours in total I would say to finish, within the span of 2 weeks.
// For most of the sprites, I used the sprite pack made for this game from spriters-resource.com
// https://www.spriters-resource.com/fullview/59302/
// I also used deviantart.com for some of the images such as the logo, winscene screen, and endscene screen.
// https://www.deviantart.com/jamaratyneklenard/art/My-Old-sprites-of-Fix-it-felix-410078695
// I also used https://www.online-image-editor.com/ to make some of the images into a transparent background such as the floors for the window and door. 
// Some of my peers that have/are taken/taking this class with Prof.Altice or Whitehead, I talked to for help with certain functionalities that I was struggling with. One of the ones I can think if was the window fixing functions.
// For all the audio clips, I used freesound.org
// https://freesound.org/people/MATRIXXX_/sounds/658266/
// https://freesound.org/people/MATRIXXX_/sounds/658266/
// https://freesound.org/people/MATRIXXX_/sounds/523771/
// https://freesound.org/people/MATRIXXX_/sounds/523771/
// https://freesound.org/people/MLaudio/sounds/615100/
// https://freesound.org/people/BloodPixelHero/sounds/613965/
// Jared the TA told me how I should make it a bit different, so I was trying to accomplish like a space theme, with the windows acting like portals that I have to cover. 




const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 750,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 475 }
        }
    },
    pixelArt: true,
    scene: [ StartScene, LoadScene, GameplayScene, EndScene, WinScene ]
};

const gameInstance = new Phaser.Game(gameConfig);

const centerX = gameInstance.config.width / 2;
const centerY = gameInstance.config.height / 2;

let inputKeys = null;