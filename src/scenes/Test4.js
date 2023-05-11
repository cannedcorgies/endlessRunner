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
        this.load.audio('sfx_sticks', './sounds/sticks.wav');
        
        this.gameOverSoundPlayed = false;
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

        // tutorials

            this.jumpText = this.add.text(game.config.width/2, game.config.height/2, 'F');

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

            

    }
  
    update() {

        if (this.player.grounded) {

            this.camera.shake(100, 0.0015);
        }

        if (!this.player.gameStart) {

            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                
                this.player.jumpStart();
                this.jumpText.alpha = 0;
                this.player.gameStart = true;

            }

            this.player.update();

        } else if (!this.player.gameOver && this.player.gameStart) {

            this.blackScreen.alpha = 0;

            this.scoreDisplay.text = this.player.score;

            this.pointPlus.x = this.player.x + 45;
            this.pointPlus.y = this.player.y - 35;
            if (this.player.pointPlused) {
                this.pointPlusTween(this.pointPlus);
                this.player.pointPlused = false;
            }

            this.tweensChecks(this.queue[0]);
            this.tweensChecks(this.queue[1]);

            this.player.update();
            this.carShadow.x = this.player.x;
            this.player.collisionWrapper(this.queue[0]);

        } else { 

            if (!this.gameOverSoundPlayed) {

                this.sound.play('sfx_crashCymbal');
                this.gameOverSoundPlayed = true;

            }
            this.player.alpha = 0; 
            this.restartText.alpha = 1;

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

        if (this.acceleration > 0.2 && this.player.gameStart) {
            this.acceleration -= 0.1;
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
    tweensChecks(segment) {

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
            this.tweenCont6(segment, this.queue, this.bank);
        }

    }

    // 6 tween functions for simulated 3D
    tweenMe(segment) {

        segment.playSound();

        var tween = this.tweens.add({

            targets: segment,
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
            }
            

        })

        segment.firstGo = true;     // note: happens before tween even ends

    }

    tweenCont2(segment) {

        var tween = this.tweens.add({

            targets: segment,
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

                console.log("from Test4.js: from tweenCont6(): running queue:", queue);
                console.log("from Test4.js: from tweenCont6(): running bank:", bank);

            }
            

        })

        segment.sixthGo = true;

    }

}