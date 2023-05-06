console.log("what is happening")

let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Test3, Test2, Test]

}

let game = new Phaser.Game(config);

// reserve keyboard vars

let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, clickLeft;

// set UI

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let leftRail = game.config.width/2 - borderPadding * 15;
let rightRail = game.config.width/2 + borderPadding * 15;