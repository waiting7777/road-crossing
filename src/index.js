import Phaser from 'phaser';

// create a new scene
const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
    this.playerSpeed = 3;
}

gameScene.preload = function() {
    this.load.image('background', './assets/background.png');
    this.load.image('player', './assets/player.png');
    this.load.image('enemy', './assets/dragon.png');
    this.load.image('goal', './assets/treasure.png');
}

gameScene.create = function() {
    const bg = this.add.sprite(0, 0, 'background');

    bg.setOrigin(0, 0);

    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

    this.player.setScale(0.5);

    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
    this.goal.setScale(0.6);

}

gameScene.update = function() {

    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    const playerRect = this.player.getBounds();
    const treasureRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        console.log('reached goal!');

        this.scene.restart();
    }

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
