import Phaser from 'phaser';

// create a new scene
const gameScene = new Phaser.Scene('Game');

// set the configuration of the game
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass the configuration
const game = new Phaser.Game(config);
