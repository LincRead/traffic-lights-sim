ig.module(
    'game.entities.button'
)

.requires(
    'impact.entity'
)

.defines(function(){
    
// Base class for all buttons in the application
EntityButton = ig.Entity.extend({

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        // Animation states
        this.addAnim( 'default', 1, [0] );
        this.addAnim( 'hover', 1, [1] );
    },

    update: function() {
    	this.parent();
    	
    	// Clicking this button?
    	if(this.checkMouseHover() && ig.input.pressed('click'))
    		this.action();
    },

    checkMouseHover: function() {
    	// Check against mouse position
    	var posx = ig.input.mouse.x;
        var posy = ig.input.mouse.y;

        if(posx > this.pos.x
        	&& posx < this.pos.x + this.size.x
        	&& posy > this.pos.y
        	&& posy < this.pos.y + this.size.y) {

        	// Set animation state
        	this.currentAnim = this.anims.hover;
        	return true;
        }
        	
        else {
        	// Set animation state
        	this.currentAnim = this.anims.default;
        	return false;
        }
    },

    // Override this
    action: function() {

    },
})
});