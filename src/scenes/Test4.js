// Testing Screen

//// NOTES ///////////



//////////////////////
class Test4 extends Phaser.Scene {

    constructor() {
  
      super('test4');
  
    }
  
    preload() {
  
        this.load.image('car', './assets/car.png');
        this.load.image('carShadow', './assets/carShadow.png');

        this.load.image('redButton', './assets/redButton.png');
        
        this.load.image('redRoad', './assets/redRoad.png');
        this.load.image('spikesLeft', './assets/spikesLeft.png');
        this.load.image('spikesRight', './assets/spikesRight.png');

        this.load.image('yellowRoad', './assets/yellowRoad.png');
        this.load.image('greenRoad', './assets/greenRoad.png');
        this.load.image('blueRoad', './assets/blueRoad.png');
        this.load.image('indigoRoad', './assets/indigoRoad.png');
        this.load.image('magentaRoad', './assets/magentaRoad.png');
        this.load.image('blackRoad', './assets/blackRoad.png');

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

            // this.add.image(leftRail, game.config.height - borderUISize - borderPadding, 'redButton');        // to check bounds
            // this.add.image(rightRail, game.config.height - borderUISize - borderPadding, 'redButton');       // to check bounds

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

        this.mouseActive = false;

        // bank and queue

            this.bank = [this.spikesLeft01, this.spikesRight01, this.blackRoad01, this.blackRoad02];
            this.queue = [this.redBlock01, this.redBlock02];

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

    }
  
    update() {

        if (!this.player.gameOver) {

            this.scoreDisplay.text = this.score;

            this.tweensChecks(this.queue[0]);
            this.tweensChecks(this.queue[1]);

            this.player.update();
            this.carShadow.x = this.player.x;
            this.player.collisionWrapper(this.queue[0]);

        }
  
    }

    addScore() {

        this.score += 1;

    }

    speedUp() {

        if (this.acceleration > 0.3) {

            this.acceleration -= 0.1;

        }

        console.log("from Test4.js: from speedUp(): speeding up!", console.log(this.acceleration));

    }

    // update to correct tween for each index in queue
    tweensChecks(segment) {

        if (!segment.firstThresh && !segment.firstGo && segment.inFront.firstThresh) {
            segment.x = segment.originX;
            segment.y = segment.originY; // resets at origin for commencement
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

                queue.push(bank[roll]);
                bank.splice(roll, 1);

                queue[1].inFront = queue[0];     // repeat

            }
            

        })

        segment.sixthGo = true;

    }

}