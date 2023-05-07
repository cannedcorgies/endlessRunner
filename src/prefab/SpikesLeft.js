// Rocket prefab

//// NOTES ///////////



//////////////////////

class SpikesLeft extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from Road.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.originY = game.config.height/2;
        this.originX = game.config.width/2;
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

        this.inFront;

    }

    update() {      // update method

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

        this.direction = 1.0;

    }

    collisionBehavior(car) {

        // console.log("from SpikesLeft.js: from collisionBehavior: car.x:", car.x);
        // console.log("from SpikesLeft.js: from collisionBehavior: this.x:", this.x);
        if (car.x - car.width/3 <= this.x) {
            car.gameOver = true;
        }

    }

}