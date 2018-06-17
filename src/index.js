import Phaser from 'phaser';

// create a new scene
const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
    this.playerSpeed = 3;
    
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;

    this.enemyMinY = 80;
    this.enemyMaxY = 280;

    this.isTerminating = false;
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

    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: {
            x: 90,
            y: 100,
            stepX: 80,
            stepY: 20
        }
    });
    
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.flipX = true

        const dir = Math.random() < 0.5 ? 1 : -1;
        const speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
    }, this);
}

gameScene.update = function() {

    if(this.isTerminating) return;

    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    const playerRect = this.player.getBounds();
    const treasureRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        console.log('reached goal!');

        return this.gameOver();
    }

    let enemies = this.enemies.getChildren();
    
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemies[i].speed;

        let conditionUP = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDOWN = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

        if(conditionUP || conditionDOWN) {
            enemies[i].speed *= -1;
        }

        let enemyRect = enemies[i].getBounds();

        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            console.log('Game over!');

            this.scene.restart();
            return this.gameOver();
        }
    }
}

gameScene.gameOver = function() {
    // initiated game over sequence
    this.isTerminating = true;

    // shake camera
    this.cameras.main.shake(500);

    // listen for event completion
    this.cameras.main.on('camerashakecomplete', function(camera, effect){
        // fade out
        this.cameras.main.fade(500);
    }, this);

    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
        // restart the Scene
        this.scene.restart();
    }, this);
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
