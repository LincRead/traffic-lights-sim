ig.module(
    'game.entities.trafficLight'
)

.requires(
    'impact.entity'
)

.defines(function(){
    
EntityTrafficLight = ig.Entity.extend({

    animSheet: new ig.AnimationSheet( 'media/lights.png', 24, 24 ),
    size: {x: 24, y: 24},
    direction: "north", // Set in Weltmeister
    carsCanProceed: true,
    lightState: "green",

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        // Animation states
        this.addAnim( 'red', 1, [0] );
        this.addAnim( 'yellow', 1, [2] );
        this.addAnim( 'green', 1, [1] );

        // Set angle of light based on direction
        switch(this.direction)
        {
            case "north": this.currentAnim.angle = 90 * (3.14/180); break;
            case "south": this.currentAnim.angle = 270 * (3.14/180); break;
            case "east": this.currentAnim.angle = 180 * (3.14/180); break;
            case "west": this.currentAnim.angle = 0; break;
            default:  this.currentAnim.angle = 0;
        }

        // Set the same angle for all animation states
       this.anims.yellow.angle = this.currentAnim.angle;
       this.anims.green.angle = this.currentAnim.angle;
    },

    update: function() {
        this.parent();

        // Set light state to match current animation color
        if(this.currentAnim === this.anims.green) this.lightState = "green";
        if(this.currentAnim === this.anims.red) this.lightState = "red";
        if(this.currentAnim === this.anims.yellow) this.lightState = "yellow";
    }, 

    /* 
    * param @value:
    * true: set color to green
    * false: set color to red
    */
    setInitialCarsCanProcess: function(value) {
        this.carsCanProceed = value;

        if(this.carsCanProceed) this.currentAnim = this.anims.green;
        else this.currentAnim = this.anims.red;
    },

    showYellowLight: function() {
        // Only show yellow light if current color is red
        if(this.currentAnim === this.anims.green)
            this.currentAnim = this.anims.yellow;
    },

    changeLight: function() {
        // Was green, so set to red
        if(this.carsCanProceed) {
            this.currentAnim = this.anims.red;
            this.carsCanProceed = false;
        // Was red, so set to green
        } else {
            this.currentAnim = this.anims.green;
            this.carsCanProceed = true;
        }
    },
})
});