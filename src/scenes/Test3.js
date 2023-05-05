// Testing Screen

//// NOTES ///////////

// bank and queue
//      - consider making classes and scripts for each
//      - popping and queueing and properties and randomizer and such
//      - conditions

//////////////////////
class Test3 extends Phaser.Scene {

    constructor() {
  
      super('test3');
  
    }
  
    preload() {
  
        this.load.image('redRoad', './assets/redRoad.png');
        this.load.image('yellowRoad', './assets/yellowRoad.png');
        this.load.image('greenRoad', './assets/greenRoad.png');
        this.load.image('blueRoad', './assets/blueRoad.png');
        this.load.image('indigoRoad', './assets/indigoRoad.png');
        this.load.image('magentaRoad', './assets/magentaRoad.png');

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
  
        // test buttons

            this.redBlock = new Rocket(this, 1000, 1000, 'redRoad');
            this.yellowBlock = new Rocket(this, 1000, 1000, 'yellowRoad');
            this.greenBlock = new Rocket(this, 1000, 1000, 'greenRoad');
            this.blueBlock = new Rocket(this, 1000, 1000, 'blueRoad');
            this.indigoBlock = new Rocket(this, 1000, 1000, 'indigoRoad');
            this.magentaBlock = new Rocket(this, 1000, 1000, 'magentaRoad');

        // bank and queue

            this.bank = [this.greenBlock, this.blueBlock, this.indigoBlock, this.magentaBlock];
            this.queue = [this.redBlock, this.yellowBlock];

        // is this thing on?

            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 50, 'WE ARE ON (NUMBER 3)', menuConfig).setOrigin(0.5);

        // start system

            this.tweenMe(this.queue[0]);
            this.yellowBlock.inFront = this.queue[0];

    }
  
    update() {

        this.tweensChecks(this.queue[0]);
        this.tweensChecks(this.queue[1]);

  
    }

    // update to correct tween for each index in queue
    tweensChecks(segment) {

        if (!segment.firstThresh && !segment.firstGo && segment.inFront.firstThresh) {
            segment.x = segment.originX;
            segment.y = segment.originY; // resets at origin for commencement
            console.log("from Test3.js: from tweensCheck: first Thresh");
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
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 1000,
            onComplete: function(){
                tween.remove();
                segment.firstThresh = true;
            }
            

        })

        segment.firstGo = true;     // note: happens before tween even ends

    }

    tweenCont2(segment) {

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 500,
            onComplete: function(){
                tween.remove();
                segment.secondThresh = true;
            }
            

        })

        segment.secondGo = true;

    }

    tweenCont3(segment) {

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 250,
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
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 125,
            onComplete: function(){
                tween.remove();
                segment.fourthThresh = true;
            }
            

        })

        segment.fourthGo = true;

    }

    tweenCont5(segment) {

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 63,
            onComplete: function(){
                tween.remove();
                segment.fifthThresh = true;
            }
            

        })

        segment.fifthGo = true;

    }

    tweenCont6(segment, queue, bank) {

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 31,
            onComplete: function(){
                tween.remove();
                segment.sixthThresh = true;
                segment.reset();                // reset state of segment   // maybe reset y when first tween is ACTUALLY about to happen

                //PLACEHOLDER
                queue.shift();                  // pop from front of queue  // final should push popped back to bank
                bank.push(segment);            // push to back             // final should push random one from bank

                let roll = Math.floor(Math.random() * 5);

                queue.push(bank[roll]);
                bank.splice(roll, 1);

                queue[1].inFront = queue[0];     // repeat

            }
            

        })

        segment.sixthGo = true;

    }

}