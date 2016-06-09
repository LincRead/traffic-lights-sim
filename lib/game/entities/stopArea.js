ig.module(
    'game.entities.stopArea'
)

.requires(
    'impact.entity'
)

.defines(function(){

EntityStopArea = ig.Entity.extend({

    type: ig.Entity.TYPE.B, // Cars check collision against this type
    size: {x: 16, y: 16},
    direction: "west", // Set in Weltmeister
    parentLightState: "none",

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        // Get the reference to the traffic light with the same direction tag
        var lights = ig.game.getEntitiesByType(EntityTrafficLight);
        for(var i = 0; i < lights.length; i++)
            if(lights[i].direction === this.direction)
                this.parentTrafficLight = lights[i];
    },

    update: function() {
    	this.parent();

        // Get light state of the reference traffic light
        this.parentLightState = this.parentTrafficLight.lightState;
    },
})
});