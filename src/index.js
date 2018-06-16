import Phaser from 'phaser';

// create a new scene
const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
    this.playerSpeed = 3;
    
    this.enemyMinSpeed = 1;
    this.enemyMaxSpeed = 4;

    this.enemyMinY = 80;
    this.enemyMaxY = 280;
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

    this.enemy = this.add.sprite(120, this.sys.game.config.height / 2, 'enemy');
    this.enemy.flipX = true;
    this.enemy.setScale(0.6);

    const dir = Math.random() < 0.5 ? 1 : -1;
    const speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    this.enemy.speed = dir * speed;

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

    this.enemy.y += this.enemy.speed;

    let conditionUP = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
    let conditionDOWN = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

    if(conditionUP || conditionDOWN) {
        this.enemy.speed *= -1;
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
