// Rocket prefab

//// NOTES ///////////



//////////////////////

class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);

        console.log("from Rocket.js: from constructor: i'm here!!")

        scene.add.existing(this); 

        this.go = false;

    }

    update() {      // update method

    }

}