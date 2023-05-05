// Testing Screen

//// NOTES ///////////

// bank and queue
//      - consider making classes and scripts for each
//      - popping and queueing and properties and randomizer and such
//      - conditions

//////////////////////
class Test2 extends Phaser.Scene {

    constructor() {
  
      super('test2');
  
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
            this.testButton.scaleX = 0.1;
            this.testButton.scaleY = 0.1;

        // is this thing on?

            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 50, 'WE ARE ON (NUMBER 2)', menuConfig).setOrigin(0.5);

        // start system
            // this.tweenMe(this.testButton);

    }
  
    update() {

        this.testButton.update();

        if (!this.testButton.firstThresh && !this.testButton.firstGo) {
            console.log("from Test2.js: from update(): should go through firs tween");
            this.tweenMe(this.testButton);
        }
        if (!this.testButton.secondThresh && !this.testButton.secondGo && this.testButton.firstThresh) {
            this.tweenCont2(this.testButton);
        }
        if (!this.testButton.thirdThresh && !this.testButton.thirdGo && this.testButton.secondThresh) {
            this.tweenCont3(this.testButton);
        }
        if (!this.testButton.fourthThresh && !this.testButton.fourthGo && this.testButton.thirdThresh) {
            this.tweenCont4(this.testButton);
        }
        if (!this.testButton.fifthThresh && !this.testButton.fifthGo && this.testButton.fourthThresh) {
            this.tweenCont5(this.testButton);
        }
        if (!this.testButton.sixthThresh && !this.testButton.sixthGo && this.testButton.fifthThresh) {
            this.tweenCont6(this.testButton);
        }
        //console.log("from Test2.js: from update(): testButton.y:", this.testButton.y);
        //console.log("from Test2.js: from update(): passed first:", this.testButton.firstThresh);
  
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
            duration: 900,
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
            duration: 800,
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
            duration: 700,
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
            duration: 600,
            onComplete: function(){
                tween.remove();
                console.log("from Test2.js: from tweenCont5(): segment.y after tween: ", segment.y);
                segment.fifthThresh = true;
            }
            

        })

        console.log("from Test2.js: from tweenCont5(): segment.y OUTSIDE tween: ", segment.y)
        segment.fifthGo = true;

    }

    tweenCont6(segment) {

        console.log("from Test2.js: from tweenCont6(): segment.y before tween: ", segment.y)

        var tween = this.tweens.add({

            targets: segment,
            y: segment.y + (segment.height * (segment.scaleX * 2.33)),
            scaleX: segment.scaleX * 2.33,
            scaleY: segment.scaleY * 2.33,
            ease:"Linear",
            duration: 500,
            onComplete: function(){
                tween.remove();
                segment.sixthThresh = true;
                segment.reset();
                console.log("from Test2.js: from tweenCont6(): segment.y after tween: ", segment.y);
                console.log("from Test2.js: from tweenCont6(): segment.firstThresh after tween: ", segment.firstThresh);
            }
            

        })

        console.log("from Test2.js: from tweenCont6(): segment.y OUTSIDE tween: ", segment.y)
        segment.sixthGo = true;

    }

}