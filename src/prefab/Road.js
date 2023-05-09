// Road prefab

//// NOTES ///////////



//////////////////////

class Road extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from Road.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.originPointY = game.config.height/2;
        this.originPointX = game.config.width/2;
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

        this.direction = 1.0;

    }

    update() {      // update method

    }

    reset() {

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

        this.inFront = null;

        this.direction = 1.0;

    }

    collisionBehavior(car) {

        // console.log("from Road.js: from collisionBehavior(): a collision happened");

    }

}