// Rocket prefab

//// NOTES ///////////



//////////////////////

class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from Rocket.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.runningHeight = this.height;

        this.firstGo = false;
        this.firstTresh = false;
        this.secondGo = false;
        this.secondTresh = false;
        this.thirdGo = false;
        this.thirdTresh = false;
        this.fourthGo = false;
        this.fourthTresh = false;
        this.fifthGo = false;
        this.fifthTresh = false;

    }

    update() {      // update method

        if (this.y >= 244.427 && !this.firstThresh) { this.firstThresh = true; this.runningHeight *= 2.33; }
        if (this.y >= 254.74191 && !this.secondThresh) { this.secondThresh = true; this.runningHeight *= 2.33; }
        if (this.y == 297 && !this.thirdThresh) { this.thirdThresh = true; this.runningHeight *= 2.33; }
        if (this.y == 316 && !this.fourthThresh) { this.fourthThresh = true; this.runningHeight *= 2.33; }

    }

}