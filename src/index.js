import Phaser from 'phaser';

// create a new scene
const gameScene = new Phaser.Scene('Game');

gameScene.preload = function() {
    this.load.image('background', './assets/background.png');
    this.load.image('player', './assets/player.png');
}

gameScene.create = function() {
    const bg = this.add.sprite(0, 0, 'background');

    bg.setPosition(640/2, 360/2);
}

// set the configuration of the game
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass the configuration
const game = new Phaser.Game(config);
