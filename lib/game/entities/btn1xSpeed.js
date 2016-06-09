ig.module(
    'game.entities.btn1xSpeed'
)

.requires(
    'game.entities.button'
)

.defines(function(){
    
EntityBtn1xSpeed = EntityButton.extend({

    animSheet: new ig.AnimationSheet( 'media/btn1xSpeed.png', 24, 24 ),
    size: {x: 24, y: 24},

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
    },

    action: function() {
        ig.game.resetSimulation(1);
    },
})
});