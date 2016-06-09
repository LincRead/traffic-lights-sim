ig.module(
    'game.entities.carSpawner'
)

.requires(
    'impact.entity',
    'game.entities.car'
)

.defines(function(){

EntityCarSpawner = ig.Entity.extend({

    size: {x: 8, y: 8},
    direction: "west", // Set in Weltmeister
    timeToNextCarSpawn: null,
    carsAlive: 0,
    maxCars: 4,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        this.timeToNextCarSpawn = new ig.Timer(1);

        // Shorter roads
        if(this.direction === "south" || this.direction === "north")
            this.maxCars = 3;
    },

    update: function() {
    	this.parent();

        // Time to spawn next car
        if(this.timeToNextCarSpawn.delta() > 0) {

            // 0.5-2 secs random spawn time for next car
            this.timeToNextCarSpawn.set(0.5 + (Math.random() * 1.5)); 

            // Too many cars spawned from this
            if(this.carsAlive >= this.maxCars)
                return;

            // Add a new car to the scene
            var newCar = ig.game.spawnEntity(EntityCar, this.pos.x - 4, this.pos.y - 4, {direction: this.direction, parent:this});

            // Keep track of cars spawned from this
            this.carsAlive++;
        }
    },
})
});