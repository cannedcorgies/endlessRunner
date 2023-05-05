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
  
        this.load.image('road', './assets/road.png');
        this.load.image('button', './assets/button.png');

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

            this.testButton = new Rocket(this, game.config.width/2, game.config.height/2, 'road');
            this.secondButton = new Rocket(this, game.config.width/2, game.config.height/2, 'road');

        // bank and queue

            this.bank = [];
            this.queue = [this.testButton, this.secondButton];

        // is this thing on?

            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 50, 'WE ARE ON (NUMBER 3)', menuConfig).setOrigin(0.5);

        // start system

            this.tweenMe(this.queue[0]);
            this.secondButton.inFront = this.queue[0];

    }
  
    update() {

        this.tweensChecks(this.queue[0]);
        this.tweensChecks(this.queue[1]);

  
    }

    tweensChecks(segment) {

        if (!segment.firstThresh && !segment.firstGo && segment.inFront.firstThresh) {
            console.log("from Test2.js: from update(): should go through firs tween");
            this.tweenMe(segment);
        }
        if (!segment.secondThresh && !segment.secondGo && segment.firstThresh) {
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
        if (!segment.sixthThresh && !segment.sixthGo && segment.fifthThresh) {
            this.tweenCont6(segment, this.queue);
        }

    }

    tweenMe(segment) {

        console.log("from Test2.js: from tweenMe(): segment.y before tween: ", segment.y)
        console.log("from Test2.js: from tweenMe(): segment.height before tween: ", segment.height);
        console.log("from Test2.js: from tweenMe(): segment.scale before tween: ", segment.scale);

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 1000,
            onComplete: function(){
                tween.remove();
                console.log("from Test2.js: from tweenMe(): segment.y after tween: ", segment.y);
                console.log("from Test2.js: from tweenMe(): segment.height after tween: ", segment.height);
                console.log("from Test2.js: from tweenMe(): segment.scale after tween: ", segment.scale);
                segment.firstThresh = true;
            }
            

        })

        segment.firstGo = true;

    }

    tweenCont2(segment) {

        console.log("from Test2.js: from tweenCont2(): segment.y before tween: ", segment.y)

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 500,
            onComplete: function(){
                tween.remove();
                console.log("from Test2.js: from tweenCont2(): segment.y after tween: ", segment.y);
                segment.secondThresh = true;
            }
            

        })

        console.log("from Test2.js: from tweenCont2(): segment.y OUTSIDE tween: ", segment.y)
        segment.secondGo = true;

    }

    tweenCont3(segment) {

        console.log("from Test2.js: from tweenCont3(): segment.y before tween: ", segment.y)

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 250,
            onComplete: function(){
                tween.remove();
                console.log("from Test2.js: from tweenCont3(): segment.y after tween: ", segment.y);
                segment.thirdThresh = true;
            }
            

        })

        console.log("from Test2.js: from tweenCont3(): segment.y OUTSIDE tween: ", segment.y)
        segment.thirdGo = true;

    }

    tweenCont4(segment) {

        console.log("from Test2.js: from tweenCont4(): segment.y before tween: ", segment.y)

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 125,
            onComplete: function(){
                tween.remove();
                console.log("from Test2.js: from tweenCont4(): segment.y after tween: ", segment.y);
                segment.fourthThresh = true;
            }
            

        })

        console.log("from Test2.js: from tweenCont4(): segment.y OUTSIDE tween: ", segment.y)
        segment.fourthGo = true;

    }

    tweenCont5(segment) {

        console.log("from Test2.js: from tweenCont5(): segment.y before tween: ", segment.y)

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 63,
            onComplete: function(){
                tween.remove();
                console.log("from Test2.js: from tweenCont5(): segment.y after tween: ", segment.y);
                segment.fifthThresh = true;
            }
            

        })

        console.log("from Test2.js: from tweenCont5(): segment.y OUTSIDE tween: ", segment.y)
        segment.fifthGo = true;

    }

    tweenCont6(segment, queue) {

        console.log("from Test2.js: from tweenCont6(): segment.y before tween: ", segment.y)

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
                segment.reset();
                queue.shift();
                queue.push(segment);
                segment.inFront = queue[0];
                console.log("from Test2.js: from tweenCont6(): segment.y after tween: ", segment.y);
                console.log("from Test2.js: from tweenCont6(): segment.firstThresh after tween: ", segment.firstThresh);
            }
            

        })

        console.log("from Test2.js: from tweenCont6(): segment.y OUTSIDE tween: ", segment.y)
        segment.sixthGo = true;

    }

}