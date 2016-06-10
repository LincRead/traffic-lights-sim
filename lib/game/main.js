ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	// Entities
	'game.entities.trafficLight',
	'game.entities.car',
	'game.entities.carSpawner',
	'game.entities.stopArea',

	// Buttons
	'game.entities.btn1xSpeed',
	'game.entities.btn30xSpeed',

	// Levels
	'game.levels.scene'
)
.defines(function(){

TrafficLightsSim = ig.Game.extend({
	// Timers
	timerChangeLight: new ig.Timer(300), // Time between changing red and green lights
	timeToShowYellowLight: 30, // In seconds
	timeSinceStart: new ig.Timer(0), // Keep track of time
	maxTimeSeconds: 1800, // In seconds (30 minutes)
	simulationSpeed: 1, // 2 is double speed, 3 tripple etc.

	// All lights go yellow if true, red or green if false
	lightsPreparingChange: false,

	// Reference to all light objects
	lights: null, 

	// Bitmap font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {

		// Load Traffic Lights Scene
		this.loadLevel(LevelScene);

		// Bind mouse button
        ig.input.initMouse();
        ig.input.bind( ig.KEY.MOUSE1, 'click' );

		// Keep a reference of all lights for easy access
		this.lights = ig.game.getEntitiesByType(EntityTrafficLight);

		// Set up which lights are initailly green or red
		this.setUpLights();
	},

	setUpLights: function() {
		for(var i = 0; i < this.lights.length; i++)
		{
			switch(this.lights[i].direction) {
				// Green lights
				case "north": this.lights[i].setInitialCarsCanProcess(true); break;
				case "south": this.lights[i].setInitialCarsCanProcess(true); break;

				// Red lights
				case "east": this.lights[i].setInitialCarsCanProcess(false); break;
				case "west": this.lights[i].setInitialCarsCanProcess(false); break;

				default: this.lights[i].setInitialCarsCanProcess(false);
			}
		}	
	},
	
	update: function() {
		this.parent();

		// Reset simulation after max simulation time has expired
		if(this.timeSinceStart.delta() >= this.maxTimeSeconds) {
			this.resetSimulation(this.simulationSpeed);
			return;
		}

		// It's time to prepare for light changes
		if(!this.lightsPreparingChange && (this.timerChangeLight.delta() + this.timeToShowYellowLight) > 0)
			this.prepareToChangeLight();
		
		// It's time to change between green and red lights
		else if(this.lightsPreparingChange && this.timerChangeLight.delta() > 0)
			this.changeLights();

		// Run tests to make sure nothing wrong is happening
		if(ig.system.runUnitTests) {
			this.UTESTtwoLightsGreenRed();
			this.UTESTyellowLightTime();
			this.UTESTchangeLightTime();
			this.UTESTsimulationSpeed();
			this.UTESTmaxSimulationTime();
		}
	},

	prepareToChangeLight: function() {
		// Set preparing light change state to active
		this.lightsPreparingChange = 1;

		// Change red lights to yellow
		for(var i = 0; i < this.lights.length; i++)
			this.lights[i].showYellowLight();	
	},

	changeLights: function() {	
		// Reset preparing light change state
		this.lightsPreparingChange = 0;

		// Reset time to when lights change again
		this.timerChangeLight.reset();

		// Change light colors
		for(var i = 0; i < this.lights.length; i++)
			this.lights[i].changeLight();			
	},

	resetSimulation: function(newSimulationSpeed) {
		// Test that param is valid
		if(ig.system.runUnitTests)
			console.assert(
				newSimulationSpeed >= 1, 
				'resetSimulation() param newSimulationSpeed has an invalid value: ' + newSimulationSpeed
			);

		// Reset time since simulation started
		this.timeSinceStart.reset();

		// Set new simulation speed
		if(newSimulationSpeed)
			this.simulationSpeed = newSimulationSpeed;

		// simulationSpeed === 1 follows requirements for assignment
		this.timerChangeLight.set(300 / this.simulationSpeed);
		this.maxTimeSeconds = 1800 / this.simulationSpeed;
		this.timeToShowYellowLight = 30 / this.simulationSpeed;

		// Reset preparing light change state
		this.lightsPreparingChange = 0;

		// Reset which lights are green or red
		this.setUpLights();

		// Remove cars from scene
		var cars = ig.game.getEntitiesByType(EntityCar);
		for(var i = 0; i < cars.length; i++)
			cars[i].kill();

		// Reset car spawners
		var carSpawners = ig.game.getEntitiesByType(EntityCarSpawner);
		for(var i = 0; i < carSpawners.length; i++)
			carSpawners[i].carsAlive = 0;
	},

	getMinuteSecondsFormat: function (seconds) {
		// Test that param is valid
		if(ig.system.runUnitTests)
			console.assert(
				seconds >= 0, 
				'getMinuteSecondsFormat() param seconds received an invalid neagtive number'
			);

	    var sec_num = parseInt(seconds);
	    var minutes = Math.floor((sec_num) / 60);
	    var seconds = sec_num - (minutes * 60);

	    if (minutes < 10) { minutes = "0" + minutes; }
	    if (seconds < 10) { seconds = "0" + seconds; }

	    return minutes + ':' + seconds;
	},
	
	draw: function() {
		this.parent();
		
		// Center of screen
		var x = ig.system.width/2,
			y = ig.system.height/2;

		// Draw text
		this.font.draw( 'Total time: ' + this.getMinuteSecondsFormat(this.timeSinceStart.delta()), 20, 20, ig.Font.ALIGN.LEFT );
		this.font.draw( 'Time to change: ' + this.getMinuteSecondsFormat(-this.timerChangeLight.delta() + 1), 20, 35, ig.Font.ALIGN.LEFT );
		this.font.draw( 'Reset:', x + 107, 15, ig.Font.ALIGN.LEFT );
	},

	// --- UNIT TESTS --- //

	UTESTtwoLightsGreenRed: function() {
		var red = 0;
		var green = 0;

		for(var i = 0; i < this.lights.length; i++) {
			if(this.lights[i].carsCanProceed) 
				green++;
			else 
				red++;
		}

		console.assert(
			red === 2 && green == 2, 
			'Wrong number of red or green lights (red: ' + red + ', green: ' + green + ')'
		);
	},

	UTESTyellowLightTime : function() {
		console.assert(
			this.timeToShowYellowLight > 0 && this.timeToShowYellowLight < this.timerChangeLight.target,
			"Invalid value for time to show yellow lights, must be > 0 and below changeLight timer target: " + this.timeToShowYellowLight
		);
	},

	UTESTchangeLightTime : function() {
		console.assert(
			this.timerChangeLight.target > 1,
			"Invalid target value for change light timer, must be > 1: " + this.timerChangeLight.target
		);
	},

	UTESTsimulationSpeed: function() {
		console.assert(
			this.simulationSpeed > 0 && this.simulationSpeed < 31,
			"Invalid simulation speed, must be > 0 and < 31: " + this.simulationSpeed
		);
	},

	UTESTmaxSimulationTime: function() {
		console.assert(
			this.maxTimeSeconds === 1800 || this.maxTimeSeconds === (1800 / this.simulationSpeed),
			"Max time has to be of value 1800 or 1800/simulationSpeed, has invalid value: " + this.maxTimeSeconds
			+ " (simulation speed: " + this.simulationSpeed + ")"
		);
	},
});

// Print unit test failures to console
console.assert = function(expr, msg) { 
	if(!expr) {
		console.log(msg);

		// Stop the application
		ig.system.stopRunLoop();
	} 
};

window.console = console;

/* 
* Start the Game with:
* - 60fps
* - 320x240 resolution
* - Scaled up by a factor of 2
*/
ig.main( '#canvas', TrafficLightsSim, 60, 320, 240, 2 );

});
