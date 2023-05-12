// Rocket prefab

//// NOTES ///////////

// if you adjust height, adjust car colliion!!

//////////////////////

class OverheadSign extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from OverheadSign.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.originPointY = game.config.height/2 - 5;
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
        this.sfx = scene.sound.add('sfx_rideBell');

        this.direction = -.5;
        this.xDirection = 0.0;

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

        this.soundPlayed = false;

    }

    collisionBehavior(car) {

        console.log("from OverheadSign.js: from collisionBehavior(): collided");
        car.overheadFail = true;
        car.gameOver = true;

    }

}