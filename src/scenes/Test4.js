// Testing Screen

//// NOTES ///////////



//////////////////////
class Test4 extends Phaser.Scene {

    constructor() {
  
      super('test4');
  
    }
  
    preload() {
        
        // player
        this.load.image('car', './assets/car.png');
        this.load.image('carShadow', './assets/carShadow.png');

        // test
        this.load.image('redButton', './assets/redButton.png');
        
        // obstacles
        this.load.image('redRoad', './assets/redRoad.png');
        this.load.image('blueRoad', './assets/blueRoad.png');

        this.load.image('spikesLeft', './assets/spikesLeft.png');
        this.load.image('spikesRight', './assets/spikesRight.png');

        this.load.image('overheadSign', './assets/watchYourHead.png');

        // extra
        this.load.image('lightLeft', './assets/lightLeft.png');
        this.load.image('lightRight', './assets/lightRight.png');
        this.load.image('yellowRoad', './assets/yellowRoad.png');
        this.load.image('greenRoad', './assets/greenRoad.png');
        this.load.image('indigoRoad', './assets/indigoRoad.png');
        this.load.image('magentaRoad', './assets/magentaRoad.png');
        this.load.image('blackRoad', './assets/blackRoad.png');

        // fade in effect
        this.load.image('blackScreen', './assets/blackScreen.png');

        // animations
        this.load.spritesheet('blinkingRedRoad', './assets/blinkingRedRoad.png', {
            frameWidth: 63,
            frameHeight: 19
        });
        this.load.spritesheet('blinkingBlueRoad', './assets/blinkingBlueRoad.png', {
            frameWidth: 63,
            frameHeight: 19
        });

        // sound effects
        this.load.audio('sfx_closedSurdo', './sounds/closedSurdo.wav');
        this.load.audio('sfx_crashCymbal', './sounds/crashCymbal.wav');
        this.load.audio('sfx_midTom1', './sounds/midTom1.wav');
        this.load.audio('sfx_openTriangle', './sounds/openTriangle.wav');
        this.load.audio('sfx_rideBell', './sounds/rideBell.wav');
        this.load.audio('sfx_rideCymbal', './sounds/rideCymbal.wav');
        this.load.audio('sfx_sticks', './sounds/sticks.wav')
        this.load.audio('sfx_whaleSinging', './sounds/whaleSinging.mp3');
        
        // background music
        this.load.audio('backgroundMusic', './sounds/darkAmbientMusic.mp3');

    }
  
    create() {

        let menuConfig = {

            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
  
        }
  
        // obstacles
            this.dummyRoad = new Road(this, 1000, 1000, 'redRoad');
            this.dummyRoad.firstThresh = true;

            this.lightLeft01 = new LightLeft(this, 1000, 1000, 'lightLeft');
            this.lightLeft02 = new LightLeft(this, 1000, 1000, 'lightLeft');
            this.lightRight01 = new LightRight(this, 1000, 1000, 'lightRight');
            this.lightRight02 = new LightRight(this, 1000, 1000, 'lightRight');

            this.blackRoad01 = new Road(this, 1000, 1000, 'blackRoad');
            this.blackRoad02 = new Road(this, 1000, 1000, 'blackRoad');

            this.redBlock01 = new Spikes(this, 1000, 1000, 'redRoad');
            this.redBlock02 = new Spikes(this, 1000, 1000, 'redRoad');

            this.spikesLeft01 = new SpikesLeft(this, 1000, 1000, 'spikesLeft');
            this.spikesRight01 = new SpikesRight(this, 1000, 1000, 'spikesRight');
            this.spikesLeft02 = new SpikesLeft(this, 1000, 1000, 'spikesLeft');
            this.spikesRight02 = new SpikesRight(this, 1000, 1000, 'spikesRight');

            this.overheadSign01 = new OverheadSign(this, 1000, 1000, 'overheadSign');
            this.overheadSign02 = new OverheadSign(this, 1000, 1000, 'overheadSign');

            this.bonus01 = new Bonus(this, 1000, 1000, 'blinkingBlueRoad');

            this.bouncePad01 = new BouncePad(this, 1000, 1000, 'blinkingRedRoad', 0);

            this.add.image(15, 10, 'blackRoad');    // to cover up bug lolol

            // bank and queue

            this.bank = [ 
                this.redBlock02,
                this.spikesLeft01, this.spikesRight01, 
                this.overheadSign01
                ];
                
            this.queue = [
                this.overheadSign02,
                this.blackRoad01,
                this.bonus01,
                this.bouncePad01,
                this.blackRoad02,
                this.redBlock01];

            this.lightsLeftBank = [];
            this.lightsLeftQueue = [ this.lightLeft01, this.lightLeft02 ];

            this.lightsRightBank = [];
            this.lightsRightQueue = [ this.lightRight01, this.lightRight02 ];


        // player

            this.carShadow = new CarShadow(this, game.config.width/2, game.config.height - borderUISize - borderPadding + 15, 'carShadow');
            this.player = new Car(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'car').setOrigin(0.5, 0);

            keyF = 
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            keyR = 
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
            keyLEFT = 
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = 
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            keyDOWN = 
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // my camera

            this.camera = this.cameras.main;
            this.cameraDefX = this.camera.x;
            this.shake = 0.0017;
        
        // scoring

            this.score = 0;
            this.scoreDisplay = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 50, this.score, menuConfig).setOrigin(0.5);

            var scoreUp = this.time.addEvent({
                delay: 1000,                // ms
                callback: this.addScore,
                //args: [],
                callbackScope: this,
                loop: true
            });

            if (localStorage.getItem("localHigh") == 'undefined') { 
                localStorage.setItem("localHigh", 0); 
                console.log("from Test4.js: from create(): local high not found");
            }

            this.highScoreIndicator = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 80, "new best").setOrigin(0.5);
            this.highScoreIndicator.alpha = 0;

            this.localHigh = localStorage.highScore;
            this.highScore = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 50, localStorage.getItem("localHigh"), menuConfig).setOrigin(0.5);

        // faster!
            
            this.acceleration = 1.0;    // lower for faster speeds!!

            var speedUp = this.time.addEvent({
                delay: 15000,                // ms
                callback: this.speedUp,
                //args: [],
                callbackScope: this,
                loop: true
            });

        // start tweening queue

            this.tweenMe(this.queue[0]);
            this.queue[0].inFront = this.dummyRoad;
            this.queue[1].inFront = this.queue[0];

            this.lightsLeftQueue[0].inFront = this.dummyRoad;
            this.lightsLeftQueue[1].inFront = this.lightsLeftQueue[0];

            this.lightsRightQueue[0].inFront = this.dummyRoad;
            this.lightsRightQueue[1].inFront = this.lightsRightQueue[0];

        // tutorials
        
            this.gameOverSoundPlayed = false;

            this.jumpText = this.add.text(game.config.width/2 - 5, game.config.height/2 - 40, 'F');
            this.leftText = this.add.text(game.config.width/2 - 20, game.config.height/2 - 30, '←');
            this.rightText = this.add.text(game.config.width/2 + 10, game.config.height/2 - 30, '→');
            this.downText = this.add.text(game.config.width/2 - 5, game.config.height/2 - 35, '↓');
            this.downText.alpha = 0;

            this.watchYourHeadText = this.add.text(game.config.width/2, game.config.height/2, 'watch your head');
            this.watchYourHeadTip = this.add.text(game.config.width/2 + 20, game.config.height/2 + 20, 'press ↓ midair to dash down');
            this.watchYourHeadText.alpha = 0;
            this.watchYourHeadTip.alpha = 0;

            this.sideStepText = this.add.text(game.config.width/2, game.config.height/2, 'move over');
            this.sideStepTip = this.add.text(game.config.width/2 + 20, game.config.height/2 + 20, 'press ← → to move side to side');
            this.sideStepText.alpha = 0;
            this.sideStepTip.alpha = 0;

            this.jumpFailText = this.add.text(game.config.width/2, game.config.height/2, 'crash');
            this.jumpFailTip = this.add.text(game.config.width/2 + 20, game.config.height/2 + 20, 'F is to jump');
            this.jumpFailText.alpha = 0;
            this.jumpFailTip.alpha = 0;
            
            this.restartText = this.add.text(game.config.width/2 + 45, game.config.height/2 + 45, 'press R to restart');
            this.restartText.alpha = 0;

            this.pointPlus = this.add.text(this.player.x + 15, this.player.y + 15, "+5");
            this.pointPlus.alpha = 0;

        // final set up
                // fade in effect
            this.blackScreen = this.add.sprite(game.config.width/2, game.config.height/2, 'blackScreen');

            var tween = this.tweens.add({

                targets: this.blackScreen,
                alpha: 0,
                ease:"Linear",
                duration: 5000,
                onComplete: function(){
                    tween.remove();
                    }
                
    
            })

                // background music
            this.backgroundMusic = this.sound.add('backgroundMusic', {volume: 0.2});
            this.backgroundMusic.loop = true;
            this.backgroundMusic.play();

            this.sfx_whaleSinging = this.sound.add('sfx_whaleSinging');

                // credits
            this.assetsCreditsLeft01 = this.add.text(5, 100, "sprites by");
            this.assetsCreditsLeft02 = this.add.text(0, 120, "fern (me)");

            this.assetsCreditsLeft01.alpha = 0;
            this.assetsCreditsLeft02.alpha = 0;

            this.assetsCreditsRight01 = this.add.text(rightRail - 40, 100, "sfx made in");
            this.assetsCreditsRight02 = this.add.text(rightRail - 35, 120, "onlinesequencer.net");

            this.assetsCreditsRight01.alpha = 0;
            this.assetsCreditsRight02.alpha = 0;

            this.assetsCreditsRight03 = this.add.text(rightRail - 30, 150, "Dark Ambient Music");
            this.assetsCreditsRight04 = this.add.text(rightRail - 25, 170, "- BreakingCopyright (YouTube)");

            this.assetsCreditsRight03.alpha = 0;
            this.assetsCreditsRight04.alpha = 0;

            this.assetsCreditsRight05 = this.add.text(rightRail - 30, 200, "Whale Singing Sound Effect");
            this.assetsCreditsRight06 = this.add.text(rightRail - 35, 220, "- NEZAR Free Sound FX (YouTube)");

            this.assetsCreditsRight05.alpha = 0;
            this.assetsCreditsRight06.alpha = 0;

    }
  
    update() {

        if (this.player.tutorialJumped) { this.jumpText.alpha = 0; }
        if (this.player.tutorialRighted) { this.rightText.alpha = 0; }
        if (this.player.tutorialLefted) { this.leftText.alpha = 0; }
        if (!this.player.grounded && !this.player.tutorialDropped) { this.downText.alpha = 1; }
        else { this.downText.alpha = 0; }

        if (!this.player.gameOver) {
        
            this.tweensChecks(this.lightsLeftQueue[0], this.lightsLeftQueue, this.lightsLeftBank);
            this.tweensChecks(this.lightsLeftQueue[1], this.lightsLeftQueue, this.lightsLeftBank);

            this.tweensChecks(this.lightsRightQueue[0], this.lightsRightQueue, this.lightsRightBank);
            this.tweensChecks(this.lightsRightQueue[1], this.lightsRightQueue, this.lightsRightBank);

        }

        if (this.player.grounded) {     // shake camera when player on ground

            this.camera.shake(100, this.shake);
        }

        if (!this.player.gameStart) {   // if game hasn't started

            if (keyLEFT.isDown && this.player.x >= leftRail + this.player.width) {

                console.log("moving left");
                this.assetsCreditsLeft01.alpha = 0;
                this.assetsCreditsLeft02.alpha = 0;
                this.assetsCreditsRight01.alpha = 1;
                this.assetsCreditsRight02.alpha = 1;
                this.assetsCreditsRight03.alpha = 1;
                this.assetsCreditsRight04.alpha = 1;
                this.assetsCreditsRight05.alpha = 1;
                this.assetsCreditsRight06.alpha = 1;
                this.camera.x -= 30;
    
            } else if (keyRIGHT.isDown && this.player.x <= rightRail - this.player.width) {
    
                console.log("moving right");
                this.assetsCreditsLeft01.alpha = 1;
                this.assetsCreditsLeft02.alpha = 1;
                this.assetsCreditsRight01.alpha = 0;
                this.assetsCreditsRight02.alpha = 0;
                this.assetsCreditsRight03.alpha = 0;
                this.assetsCreditsRight04.alpha = 0;
                this.assetsCreditsRight05.alpha = 0;
                this.assetsCreditsRight06.alpha = 0;
                this.camera.x += 30;
    
            }

            if (Phaser.Input.Keyboard.JustDown(keyF)) {     // start when f pressed (on first jump)
                
                this.player.jumpStart();
                this.jumpText.alpha = 0;
                this.highScore.alpha = 0;
                this.player.gameStart = true;

            }

            this.player.update();       // move left and right

        } else if (!this.player.gameOver && this.player.gameStart) {    // run regular game

            this.assetsCreditsLeft01.alpha = 0;
            this.assetsCreditsLeft02.alpha = 0;
            this.assetsCreditsRight01.alpha = 0;
            this.assetsCreditsRight02.alpha = 0;
            this.assetsCreditsRight03.alpha = 0;
            this.assetsCreditsRight04.alpha = 0;
            this.assetsCreditsRight05.alpha = 0;
            this.assetsCreditsRight06.alpha = 0;

            this.camera.x = this.cameraDefX;

            this.blackScreen.alpha = 0;     // make sure fade in is off

            this.scoreDisplay.text = this.player.score;     // update score

            // bonus point indicator update
            this.pointPlus.x = this.player.x + 45;      // point indicator follows
            this.pointPlus.y = this.player.y - 35;      //
            if (this.player.pointPlused) {              // if bonus points gained...
                this.pointPlusTween(this.pointPlus);        // fade out point indicator
                this.player.pointPlused = false;
            }

            // tween two objects at any given time
            this.tweensChecks(this.queue[0], this.queue, this.bank);
            this.tweensChecks(this.queue[1], this.queue, this.bank);

            // player, shadow, and collision update
            this.player.update();
            this.carShadow.x = this.player.x;
            this.player.collisionWrapper(this.queue[0]);

        } else {        // if game over

            this.jumpText.alpha = 0;
            this.leftText.alpha = 0;
            this.rightText.alpha = 0;
            this.downText.alpha = 0;

            this.shake = 0.0015
            // high score save
            if (localStorage.getItem("localHigh") < this.player.score) {

                localStorage.setItem("localHigh", this.player.score + 1);
                this.highScoreIndicator.alpha = 1;

            }

            // play crash cymbal sfx once
            if (!this.gameOverSoundPlayed) {

                this.sound.play('sfx_crashCymbal');     // play crash once
                this.backgroundMusic.stop();            // turn off background music
                this.gameOverSoundPlayed = true;

            }

            this.player.alpha = 0;          // player is removed from screen
            this.carShadow.alpha = 0;
            this.restartText.alpha = 1;     // plus restart prompt

            // conditional tutorial
            if (this.player.overheadFail) {

                this.watchYourHeadText.alpha = 1;
                this.watchYourHeadTip.alpha = 1;

            }

            if (this.player.groundFail) {

                this.jumpFailText.alpha = 1;
                this.jumpFailTip.alpha = 1;
                
            }

            if (this.player.sideFail) {

                this.sideStepText.alpha = 1;
                this.sideStepTip.alpha = 1;
                
            }

            // restart
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                
                this.scene.restart();

            }
        }
  
    }

    addScore() {

        if (this.player.gameStart) {
            this.player.score += 1;
        }

    }

    speedUp() {

        if (this.player.gameStart){

            this.sfx_whaleSinging.setSeek(1);
            this.sfx_whaleSinging.play();

        }
        
        if (this.acceleration > 0.2 && this.player.gameStart) {
            this.acceleration -= 0.1;
            this.shake += 0.0001
        }

        console.log("from Test4.js: from speedUp(): speeding up!", console.log(this.acceleration));

    }

    pointPlusTween(pointPlus) {

        pointPlus.alpha = 1;
        var tween = this.tweens.add({

            targets: pointPlus,
            alpha: 0,
            ease:"Linear",
            duration: 2000,
            onComplete: function(){
                tween.remove();
                }
            

        })

    }

    // update to correct tween for each index in queue
    tweensChecks(segment, queue, bank) {

        if (!segment.firstThresh && !segment.firstGo && segment.inFront.firstThresh) {
            segment.x = segment.originPointX;
            segment.y = segment.originPointY; // resets at origin for commencement
            this.tweenMe(segment);
        }
        if (!segment.secondThresh && !segment.secondGo && segment.firstThresh) {        // goes to next tween after confirmation that prev is done
            this.tweenCont2(segment);
        }
        if (!segment.thirdThresh && !segment.thirdGo && segment.secondThresh) {
            this.tweenCont3(segment);
        }
        if (!segment.fourthThresh && !segment.fourthGo && segment.thirdThresh) {
            this.tweenCont4(segment);
        }
        if (!segment.fifthThresh && !segment.fifthGo && segment.fourthThresh) {
            this.tweenCont5(segment);
        }
        if (!segment.sixthThresh && !segment.sixthGo && segment.fifthThresh) {          // queue passed for popping and pushing
            this.tweenCont6(segment, queue, bank);
        }

    }

    // 6 tween functions for simulated 3D
    tweenMe(segment) {

        segment.playSound();

        var tween = this.tweens.add({

            targets: segment,
            x: segment.x + (segment.width * (segment.scaleX * 2.33)) * segment.xDirection,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)) * segment.direction,
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 1000 * this.acceleration,
            onComplete: function(){
                tween.remove();
                segment.firstThresh = true;
                segment.currWidth *= 2.33;
                segment.currHeight *= 2.33;

                // console.log("Test4.js: tweenMe():", segment.xDirection);

            }
            

        })

        segment.firstGo = true;     // note: happens before tween even ends

    }

    tweenCont2(segment) {

        var tween = this.tweens.add({

            targets: segment,
            x: segment.x + (segment.width * (segment.scaleX * 2.33)) * segment.xDirection,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)) * segment.direction,
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 500 * this.acceleration,
            onComplete: function(){
                tween.remove();
                segment.secondThresh = true;
                segment.currWidth *= 2.33;
                segment.currHeight *= 2.33;
            }
            

        })

        segment.secondGo = true;

    }

    tweenCont3(segment) {

        var tween = this.tweens.add({

            targets: segment,
            x: segment.x + (segment.width * (segment.scaleX * 2.33)) * segment.xDirection,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)) * segment.direction,
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 250 * this.acceleration,
            onComplete: function(){
                tween.remove();
                segment.thirdThresh = true;
            }
            

        })

        segment.thirdGo = true;

    }

    tweenCont4(segment) {

        var tween = this.tweens.add({

            targets: segment,
            x: segment.x + (segment.width * (segment.scaleX * 2.33)) * segment.xDirection,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)) * segment.direction,
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 125 * this.acceleration,
            onComplete: function(){
                tween.remove();
                segment.fourthThresh = true;
                segment.currWidth *= 2.33;
                segment.currHeight *= 2.33;
            }
            

        })

        segment.fourthGo = true;

    }

    tweenCont5(segment) {

        var tween = this.tweens.add({

            targets: segment,
            x: segment.x + (segment.width * (segment.scaleX * 2.33)) * segment.xDirection,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)) * segment.direction,
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 63 * this.acceleration,
            onComplete: function(){
                tween.remove();
                segment.fifthThresh = true;
                segment.currWidth *= 2.33;
                segment.currHeight *= 2.33;
            }
            

        })

        segment.fifthGo = true;

    }

    tweenCont6(segment, queue, bank) {

        var tween = this.tweens.add({

            targets: segment,
            x: segment.x + (segment.width * (segment.scaleX * 2.33)) * segment.xDirection,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)) * segment.direction,
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 31 * this.acceleration,
            onComplete: function(){
                tween.remove();
                segment.sixthThresh = true;
                segment.currWidth *= 2.33;
                segment.currHeight *= 2.33;
                segment.reset();                // reset state of segment   // maybe reset y when first tween is ACTUALLY about to happen

                //PLACEHOLDER
                queue.shift();                  // pop from front of queue  // final should push popped back to bank
                bank.push(segment);            // push to back             // final should push random one from bank

                let roll = Math.floor(Math.random() * bank.length);
                
                if (queue.length <= 1) {
                    queue.push(bank[roll]);
                    bank.splice(roll, 1);
                }

                queue[1].inFront = queue[0];     // repeat

                // console.log("from Test4.js: from tweenCont6(): running queue:", queue);
                // console.log("from Test4.js: from tweenCont6(): running bank:", bank);

            }
            

        })

        segment.sixthGo = true;

    }

}