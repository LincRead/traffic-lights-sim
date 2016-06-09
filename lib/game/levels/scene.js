ig.module( 'game.levels.scene' )
.requires( 'impact.image','game.entities.trafficLight','game.entities.carSpawner','game.entities.btn1xSpeed','game.entities.btn30xSpeed','game.entities.stopArea' )
.defines(function(){
LevelScene=/*JSON[*/{
	"entities": [
		{
			"type": "EntityTrafficLight",
			"x": 112,
			"y": 112,
			"settings": {
				"direction": "north"
			}
		},
		{
			"type": "EntityCarSpawner",
			"x": 164,
			"y": 68,
			"settings": {
				"direction": "south"
			}
		},
		{
			"type": "EntityTrafficLight",
			"x": 180,
			"y": 180,
			"settings": {
				"direction": "south"
			}
		},
		{
			"type": "EntityTrafficLight",
			"x": 180,
			"y": 112,
			"settings": {
				"direction": "east"
			}
		},
		{
			"type": "EntityBtn1xSpeed",
			"x": 252,
			"y": 28
		},
		{
			"type": "EntityBtn30xSpeed",
			"x": 284,
			"y": 28
		},
		{
			"type": "EntityTrafficLight",
			"x": 112,
			"y": 180,
			"settings": {
				"direction": "west"
			}
		},
		{
			"type": "EntityCarSpawner",
			"x": -4,
			"y": 144,
			"settings": {
				"direction": "east"
			}
		},
		{
			"type": "EntityCarSpawner",
			"x": 320,
			"y": 162
		},
		{
			"type": "EntityCarSpawner",
			"x": 145,
			"y": 236,
			"settings": {
				"direction": "north"
			}
		},
		{
			"type": "EntityStopArea",
			"x": 121,
			"y": 140,
			"settings": {
				"direction": "east"
			}
		},
		{
			"type": "EntityStopArea",
			"x": 140,
			"y": 177,
			"settings": {
				"direction": "north"
			}
		},
		{
			"type": "EntityStopArea",
			"x": 180,
			"y": 158,
			"settings": {
				"direction": "west"
			}
		},
		{
			"type": "EntityStopArea",
			"x": 160,
			"y": 121,
			"settings": {
				"direction": "south"
			}
		}
	],
	"layer": [
		{
			"name": "road",
			"width": 20,
			"height": 15,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/road.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
				[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
				[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
				[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],
				[81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
				[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],
				[121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140],
				[141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160],
				[161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180],
				[181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200],
				[201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220]
			]
		},
		{
			"name": "collision",
			"width": 20,
			"height": 15,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
LevelSceneResources=[new ig.Image('media/road.png')];
});