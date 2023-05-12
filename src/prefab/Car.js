// Rocket prefab

//// NOTES ///////////

// ground-pounding is giving an INSANE amound of points
    // collision doesn't disable ship sprite - there is some
    // latency before it resets to right of screen

//////////////////////

class Car extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, player01 = true, player02 = false, frame) {

        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);       // add to existing

        console.log("from Car.js: from constructor: i'm here!!")

        this.moveSpeed = 30;             // pixels to move per frame
        this.airSpeed = 45;

        // jump
        this.jumpPower = 25;
        this.smallJumpPower = 15;
        this.smallJumpDef = 15;
        this.yVel = this.jumpPower;

            // going up
        this.yDrag = 1.0;
        this.defDrag = 1.0;
        this.yAcc = 0.99;
        this.defAcc = 0.99;     // default

            // going down
        this.yBoost = 1.0;
        this.defBoost = 1.0;
        this.yDec = 0.99;
        this.defDec = 0.99;     // dafault

            // bouncing
        this.bounceAcc = 0.95;
        this.bounceDec = 0.95;
        this.timeMultiplier = 0.0;
        this.timeMultiplierDef = 0.0;
        this.pointMultiplier = 1;
        this.pointMultiplierDef = 1;


            // states
        this.peaked = false;    // start deceleration
        this.grounded = true;   // fell back down; reset
        this.jumping = false;   // is in process of jumping
        this.bouncing = false;  // is BOUNCING from ship to ship
        this.bonked = false;    // hit underside of ship
        this.dropping = false;  // player executed ground-pound

            // multiplayer
        this.twoPlayersActivated = false
        this.player01 = player01;
        this.player02 = player02;
        this.spawning = false;
        this.active = true;

            // flags and game
        this.score = 0;
        this.pointPlused = false;
        this.gameOver = false;
        this.gameStart = false;
        this.overheadFail = false;
        this.sideFail = false;
        this.groundFail = false;

            // tutorials
        this.tutorialJumped = false;
        this.tutorialLefted = false;
        this.tutorialRighted = false;
        this.tutorialDropped = false;

    }

    update() {

        if (game.input.activePointer.isDown) { this.mouseActivated = true; }
        if (this.jumping && !game.input.activePointer.isDown) { this.downAvailable = true; }

        // left/right movement
        if (keyLEFT.isDown&& this.x >= leftRail + this.width) {

            this.tutorialLefted = true;

            if (this.jumping){
                this.x -= this.airSpeed;    // floaty movement in the air
            } else {
                this.x -= this.moveSpeed;
            }

        } else if (keyRIGHT.isDown && this.x <= rightRail - this.width) {

            this.tutorialRighted = true;

            if (this.jumping){
                this.x += this.airSpeed;    // floaty movement in the air
            } else {
                this.x += this.moveSpeed;
            }

        }


        // jump button
        if (Phaser.Input.Keyboard.JustDown(keyF) && this.grounded) { // keyF.isDown for constant, Phaser.Input.Keyboard.JustDown(keyF) for once

            this.tutorialJumped = true;
            
            this.jumpStart();
            //this.sfxRocket.play();
            
        }

        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && !this.grounded) { // keyDOWN.isDown for constant, Phaser.Input.Keyboard.JustDown(keyDOWN) for once

            this.tutorialDropped = true;
            
            this.dropping = true;
            this.jumping = false;
            this.bouncing = false;
            
        }
        
        // in the air, two states: jumping or ground-pounding (dropping)
        if (this.jumping) {
            this.jump();
        }

        if (this.dropping) {
            this.drop();
        }

    }

    jumpStart() {

        this.grounded = false;
        this.jumping = true;
            
    }

    // reset rocket to "ground"
    groundReset() {

        this.y = game.config.height - borderUISize - borderPadding;     // back to ground
        this.jumping = false;                                           // jumping has stopped
        this.grounded = true;                                           // back on the ground
        this.dropping = false;                                          // can't drop further down
        this.peaked = false;
        this.bouncing = false;

        this.yAcc = this.defAcc;
        this.yDec = this.defDec;
        this.yVel = this.jumpPower;
        this.yDrag = this.defDrag;
        this.yBoost = this.defBoost;
        this.smallJumpPower = this.smallJumpDef;
        this.bonked = false;
        
    }

    bouncingReset() {

        // part that enables another jump
        this.peaked = false;

        this.yVel = this.smallJumpPower;    // each bounce goes a bit higher
        if (this.smallJumpPower < 18) {     // 20 smallJumpPower is the cap
            this.smallJumpPower += 2;
        }
        if (this.timeMultiplier < 0.50) {
            this.timeMultiplier += 0.25;
        }
        if (this.pointMultiplier < 5) {
            this.pointMultiplier += 1;
        }

        // reset deceleration on way up
        this.yDrag = this.defDrag;
        this.yDec = this.bounceDec;

        // reset acceleration on way down
        this.yBoost = this.defBoost;
        this.yAcc = this.bounceAcc;
        
        // possible to hit another underside now
        this.bonked = false;

    }

    jump() {

        if (this.yVel <= 0) { this.peaked = true; }     // if velocity is at its minimum, jump has hit peak
        
        if (this.peaked) {              // start going down

            this.y += this.yVel;
            this.yVel += this.yBoost;
            this.yBoost *= this.yAcc;

        } else {                        // still going up

            this.y -= this.yVel;
            this.yVel -= this.yDrag;
            this.yDrag *= this.yDec;

        }

        if (this.y >= game.config.height - borderUISize - borderPadding){   // ground hit

            this.groundReset();

        }

    }

    smallJump() {

        this.bouncingReset();
        this.jump();

    }

    bonk() {

        this.peaked = true;     // starts descent
        this.yBoost = 4;        // starts it fast
        this.jump();            // when jump is entered with peaked = true, will go down

    }

    drop() {

        this.peaked = true;     // same story as bonk
        this.yBoost = 10;
        this.jump();

    }

    checkCollision(collidee) {

        if (this.active) {

            if (collidee.direction > 0 && this.grounded) {

                // simple AABB checking
                if (((this.x < collidee.x + collidee.currWidth &&                   // check if rocket origin is to left of collidee's RIGHT bound
                        this.x + this.width > collidee.x) ||                        // check if collidee origin is to left of ROCKET'S RIGHT bound
                        (this.x > collidee.x - collidee.currWidth &&                // check if rocket origin is to right of collidee'S RIGHT bound     // either or it's trapped in box
                        collidee.y > this.x - this.width))                          // check if collidee origin is to right of ROCKET'S RIGHT bound
                        &&
                        (this.y < collidee.y + collidee.currHeight &&               // check if rocket origin is above collidee's LOWER bound
                        this.height + this.y > collidee. y)) {                      // check if collidee origin is above ROCKET'S LOWER bound
                    
                        return true && this.grounded && collidee.fifthThresh;       // returns true both if objects touching and collisions activated
        
                    }

            } else if (this.y <= game.config.height/2.8 && collidee.fifthThresh && collidee.direction < 0) {
                return true;        // returns true both if player is in blastzone
            } else { return false; }
        }
    
    }

    collisionWrapper(collidee){

        if (this.checkCollision(collidee)) {        // if collision actually happened

            console.log("from Car.js: from collisionWrapper: should've collided");
            collidee.collisionBehavior(this);
  
        }
  
    }

}