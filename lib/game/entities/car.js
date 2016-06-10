ig.module(
    'game.entities.car'
)

.requires(
    'impact.entity'
)

.defines(function(){
    
EntityCar = ig.Entity.extend({

    animSheet: new ig.AnimationSheet( 'media/cars.png', 16, 16 ),
    size: {x: 16, y: 16},
    tag: "car",

    direction: "west", // Default
    drivingSpeed: 100,
    carCanMove: true,
    driveOnYellow: false,

    // Collision values
    collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        // Set parent car spawner
        this.parentCarSpawner = settings.parent;

        // Get direction from parent car spawner
        this.direction = settings.direction;

        // Pick a random color
        this.addAnim( 'default', 1, [parseInt((Math.random() * 6))] );

        // Set angle based on direction tag
        switch(this.direction)
        {
            case "north": this.currentAnim.angle = 90 * (3.14/180); break;
            case "south": this.currentAnim.angle = 270 * (3.14/180); break;
            case "east": this.currentAnim.angle = 180 * (3.14/180); break;
            case "west": this.currentAnim.angle = 0; break;
            default:  this.currentAnim.angle = 0;
        }
    },

    update: function() {
        this.parent();

        // Make sure nothing wrong happens changes during game time
        if(ig.system.runUnitTests) {
            this.UTESTvalidDirection();
            this.UTESTvalidDrivingSpeed();
        }

        if(this.carCanMove)
            this.moveCar();

        this.handleOutsideScreen();
    },

    // Move in set direction
    moveCar: function() {
        switch(this.direction) {
            case "north": this.pos.y -= this.drivingSpeed * ig.system.tick; break;
            case "south": this.pos.y += this.drivingSpeed * ig.system.tick; break;
            case "east": this.pos.x += this.drivingSpeed * ig.system.tick; break;
            case "west": this.pos.x -= this.drivingSpeed * ig.system.tick; break;
            default:
        }
    },

    startMovingCar: function() {
        this.carCanMove = true;
    },

    stopCar: function() {
       this.carCanMove = false;
    },

    // Overriding engine
    handleMovementTrace: function( res ) {
        this.pos = res.pos;
    },

    // Colliding against another object
    check: function(other) {
        // Check which type of object we collided with
        if(other.tag === "stopArea")
            this.handleCollisionWithStopArea(other);
    },

    handleCollisionWithStopArea: function(other) {
        // Unit test
        if(ig.system.runUnitTests)
            this.UTESTvalidLightState(other);

        /* 
        * If we are colliding with the stop area while the corresponding light is green, 
        * make sure we continue even if the light turns yellow
        */
        if(other.parentLightState === "green") {
            this.driveOnYellow = true;

            // If stopped, start moving again
            if(this.vel.x === 0 && this.vel.y === 0)
                this.carCanMove = true;

            return;
        }

        // Already on stop area when light turned yellow, so safer to continue than stop
        if(this.driveOnYellow)
            return;

        // Based on direction of stop area, make sure car doesn't proceed pass the stop area
        switch(other.direction) {
            case "north": while(this.pos.y < other.pos.y) {
                this.pos.y += 0.01; this.carCanMove = false;
            } break;

            case "south": while(this.pos.y > other.pos.y) {
                this.pos.y -= 0.01; this.carCanMove = false;
            } break;

            case "east": while(this.pos.x > other.pos.x) {
                this.pos.x -= 0.01; this.carCanMove = false;
            } break;

            case "west": while(this.pos.x < other.pos.x ) {
                this.pos.x += 0.01; this.carCanMove = false;
            } break
        }
    },

    handleOutsideScreen : function() {
        if(this.pos.x + this.size.x < 0 || this.pos.x > 320 || this.pos.y > 240 || (this.pos.y + this.size.y) < 80) {
            
            if(this.parentCarSpawner)
                this.parentCarSpawner.carsAlive--;
            
            this.kill();
        }
    },

    // --- UNIT TESTS --- //

    UTESTvalidDirection : function() {
        console.assert(
            this.direction === "north" 
            || this.direction === "south" 
            || this.direction === "east"
            || this.direction === "west",
            "A car has an invalid direction: " + this.direction
        );        
    },

    UTESTvalidDrivingSpeed: function() {
        console.assert(
            this.drivingSpeed > 0 && this.drivingSpeed <= this.maxVel.x,
            'A car has an invalid driving speed: ' + this.drivingSpeed
        );
    },

    UTESTvalidLightState: function(other) {
        console.assert(
            other.parentLightState === "green" 
            || other.parentLightState === "red"
            || other.parentLightState === "yellow",
            ('A stop area gave us an invalid light state when a car collided with it: ' + other.parentLightState)
        );
    },
})
});