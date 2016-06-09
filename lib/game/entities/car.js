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

    direction: "west", // Default
    drivingSpeed: 90,
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

        // Move in set direction
        switch(this.direction) {
            case "north": this.pos.y -= this.drivingSpeed * ig.system.tick; break;
            case "south": this.pos.y += this.drivingSpeed * ig.system.tick; break;
            case "east": this.pos.x += this.drivingSpeed * ig.system.tick; break;
            case "west": this.pos.x -= this.drivingSpeed * ig.system.tick; break;
            default:
        }

        this.handleOutsideScreen();
    },

    // Colliding against a stop sign
    check: function(other) {

        /* 
        * If we are colliding with the stop area while the corresponding light is green, 
        * make sure we continue even if the light turns yellow
        */
        if(other.parentLightState === "green") {
            this.driveOnYellow = true;
            return;
        }

        // Already on stop area when light turned yellow, so safer to continue than stop
        if(this.driveOnYellow)
            return;

        // Based on direction of stop area, make sure car doesn't proceed pass the stop area
        switch(other.direction) {
            case "north": while(this.pos.y < other.pos.y) {
                this.pos.y += 0.01;
            } break;

            case "south": while(this.pos.y > other.pos.y) {
                this.pos.y -= 0.01;
            } break;

            case "east": while(this.pos.x > other.pos.x) {
                this.pos.x -= 0.01;
            } break;

            case "west": while(this.pos.x < other.pos.x ) {
                this.pos.x += 0.01;
            } break
        }
    },

    handleOutsideScreen : function() {

        if(this.pos.x + this.size.x < 0 || this.pos.x > 320 || this.pos.y > 240 || (this.pos.y + this.size.y) < 80) {
            
            if(this.parentCarSpawner)
                this.parentCarSpawner.carsAlive--;
            
            this.kill();
        }
    }
})
});