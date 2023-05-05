// Rocket prefab

//// NOTES ///////////



//////////////////////

class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from Rocket.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.origin = y;

        this.runningHeight = this.height;

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

    }

    update() {      // update method

    }

    reset() {

        this.y = this.origin;
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

        console.log("from Rocket.js: from reset(): segment.firstThresh after tween: ", this.firstThresh);
    }

}