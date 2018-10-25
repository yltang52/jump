var main = {

  preload: function() {
    game.load.image('background', 'assets/background.png');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('ice-platform', 'assets/ice-platform.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },
  
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.image(0, 0, 'background');
    
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    //this.platforms = game.add.physicsGroup();

    var platform = this.platforms.create(0, 64, 'ice-platform');
    platform.body.friction.x = 0;
    this.platforms.create(200, 180, 'platform');
    platform = this.platforms.create(400, 296, 'ice-platform');
    platform.body.friction.x = 0;
    this.platforms.create(600, 412, 'platform');
    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.velocity.x', 100);

    this.player = game.add.sprite(320, 400, 'dude');

    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(20, 32, 5, 16);
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    this.cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.platforms.forEach(this.wrapPlatform, this);
    this.platforms.forEach(this.upAndDown, this);

    game.physics.arcade.collide(this.player, this.platforms);
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {            // 左移
      this.player.body.velocity.x = -200;
      this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown) {    // 右移
      this.player.body.velocity.x = 200;
      this.player.animations.play('right');
    }
    else {    // 靜止
      this.player.animations.stop();
      this.player.frame = 4;
    }
    
    if (this.cursors.up.isDown && 
        (this.player.body.onFloor() || this.player.body.touching.down)) {
      this.player.body.velocity.y = -600;
    }
    
  },
 
  wrapPlatform: function(platform) {
    if (platform.x>=800) {
      platform.x = -160;
    }
  },
  
  upAndDown: function(platform) {
    if (platform.x==-160) {
      platform.body.velocity.y = (Math.random()-0.5)*100;
      platform.position.y = Math.random()*480;
    }
  },
  
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');