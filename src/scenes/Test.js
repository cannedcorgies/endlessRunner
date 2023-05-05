// Testing Screen

//// NOTES ///////////

// bank and queue
//      - consider making classes and scripts for each
//      - popping and queueing and properties and randomizer and such
//      - conditions

//////////////////////
class Test extends Phaser.Scene {

    constructor() {
  
      super('test');
  
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

        // is this thing on?

            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*15 + 50, 'WE ARE ON', menuConfig).setOrigin(0.5);

        // my endless runner system

            this.bank = [];
            this.queue = [this.testButton, this.secondButton];

        // start system
            this.front = this.queue.shift();
            this.tweenMe(this.front);
            this.queue.push(this.front);

    }
  
    update() {

        if (this.front.y == game.config.height + 160) {     // will have to be changed - calculate coordinate conditions (start twial and error) or inspecting image sizes

            // to go in reset()
            this.front.y = game.config.height/2;
            this.front.scaleX = 0.1,
            this.front.scaleY = 0.1,
            this.front = this.queue.shift();        // next to be tweened
            this.tweenMe(this.front);               // actually tween
            this.queue.push(this.front);            // return to queue for now

        }
  
    }

    tweenMe(segment) {

        var tween = this.tweens.add({

            targets: segment,
            y: game.config.height + 160,
            scaleX: 10,
            scaleY: 10,
            ease:"Linear",
            duration: 1000,
            onComplete:function(){
                tween.remove();
            }

        })

        segment.go = true;

    }

}