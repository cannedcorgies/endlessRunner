//// MACH SPEED ///////////
//
// Fernando Alcazar
// Approx 15 hous
//
// My simulated 3D is both my proudest
//  technical AND stylistic achievement.
//  On a technical level, it was achieved
//  through a system of tweens (scaling
//  and repositioning) with a queue object
//  and a bank object, that combined simply gave
//  the illusion that objects are coming
//  towards the screen. From there, all game
//  design decisions were derived.
//
//  Paranoia was the emergent emotion from the illusion,
//  thus, I worked hard to push the feeling: the style is
//  dark and claustrophobic, screen shake increases over time, 
//  music and sounds are subtle, minimal, but eerie. 
//  The game even shoots out the same series of blocks every
//  time it starts, as a brief tutorial! That is, a beginner
//  is very likely to run into the blue block, bounce off the
//  blinking red, and, being trusting enough, collide with
//  the solid red.
//
//  The greatest hurdle was assuring the game worked WITHIN
//  the scope of my simulated 3D. I deviced my own physics
//  to ensure the game was reactive and reasonable, and the
//  custom collisions check to ensure the sprites have passed
//  specific "thresholds" that prove that the object is within
//  "proximity."
//
///////////////////////////

console.log("what is happening")

let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: "arcade",
        arcade: { debug: true }
    },
    scene: [Test4, Test3, Test2, Test]

}

let game = new Phaser.Game(config);

// reserve keyboard vars

let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, clickLeft;

// set UI

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let leftRail = game.config.width/2 - borderPadding * 15;
let rightRail = game.config.width/2 + borderPadding * 15;