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
    carsCanProceed: false,
    lightState: "red",

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        // Animation states
        this.addAnim( 'red', 1, [0] );
        this.addAnim( 'green', 1, [1] );
        this.addAnim( 'yellow', 1, [2] );

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

        // Do this every update loop to make sure nothing goes wrong
        if(ig.game.runUnitTests)
            this.runUnitTests();
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

    // --- UNIT TESTS --- //

    runUnitTests: function() {
        // Make sure carsCanProceed is of bool type
        console.assert(
            this.carsCanProceed === true || this.carsCanProceed === false,
            "A traffic light's carsCanProceed value is not of correct type bool"
        );

        // Make sure the correct animation is always played for the carsCanProceed value
        console.assert(
            // Green and yellow when cars can continue
            (this.carsCanProceed && (this.currentAnim === this.anims.green || this.currentAnim === this.anims.yellow))
            // Red when cars have to stop
            || (!this.carsCanProceed && this.currentAnim === this.anims.red),
            'A traffic light is playing the wrong animation for state carsCanProceed ' + this.carsCanProceed
        );

        // Make sure the correct animation is always played for all light states
        console.assert(
            (this.lightState === "green" && this.currentAnim === this.anims.green)
            || (this.lightState === "red" && this.currentAnim === this.anims.red)
            || (this.lightState === "yellow" && this.currentAnim === this.anims.yellow),
            'A traffic light is playing the wrong animation for lightState ' + this.lightState
        );

        // Make sure a traffic light always has a valid direction
        console.assert(
            this.direction === "north" 
            || this.direction === "south" 
            || this.direction === "east"
            || this.direction === "west",
            "A traffic light has an invalid direction: " + this.direction
        );   
    },
})
});