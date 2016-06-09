ig.module(
    'game.entities.btn30xSpeed'
)

.requires(
    'game.entities.button'
)

.defines(function(){

EntityBtn30xSpeed = EntityButton.extend({

    animSheet: new ig.AnimationSheet( 'media/btn30xSpeed.png', 24, 24 ),
    size: {x: 24, y: 24},

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
    },

    action: function() {
        ig.game.resetSimulation(30);
    },
})
});