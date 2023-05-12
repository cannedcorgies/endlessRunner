// Bonus prefab

//// NOTES ///////////



//////////////////////

class BouncePad extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from BouncePad.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.originPointY = game.config.height/2;
        this.originPointX = game.config.width/2;
        this.currWidth = this.width;
        this.currHeight = this.height;
        this.scaleX = 0.1;
        this.scaleY = 0.1;

        this.firstGo = false;
        this.firstThresh = false;
        this.secondGo = false;
        this.secondThresh = false;
        this.thirdGo = false;
        this.thirdThresh = false;
        this.fourthGo = false;
        this.fourthThresh = false;
        this.fifthGo = false;
        this.fifthThresh = false;
        this.sixthGo = false;
        this.sixthThresh = false;

        this.inFront;

        this.soundPlayed = false;
        this.sfx = scene.sound.add('sfx_rideCymbal');

        this.direction = 1.0;
        this.xDirection = 0.0;

        this.anims.create({         // simple animation that oscillates between frames 0 and 1, repeating
            key: "blinking",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("blinkingRedRoad", {start: 0, end:1}),
            repeat: -1
        });

        this.anims.play("blinking");

    }

    update() {      // update method

    }

    playSound() {

        if (!this.soundPlayed) {

            this.sfx.play();
            this.soundPlayed = true;
        
        }
    }

    reset() {

        this.scaleX = 0.1;
        this.scaleY = 0.1;

        this.currWidth = this.width;
        this.currHeight = this.height;

        this.firstGo = false;
        this.firstThresh = false;
        this.secondGo = false;
        this.secondThresh = false;
        this.thirdGo = false;
        this.thirdThresh = false;
        this.fourthGo = false;
        this.fourthThresh = false;
        this.fifthGo = false;
        this.fifthThresh = false;
        this.sixthGo = false;
        this.sixthThresh = false;

        this.inFront = null;

        this.collided = false;
        this.alpha = 1;

        this.soundPlayed = false;

    }

    collisionBehavior(car) {

        car.jumpStart();

    }

}