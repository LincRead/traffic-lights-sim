# Traffic Lights Sim

This application simulates a set of traffic lights at an intersection. The traffic lights are designated (N, S) and (E, W) like a compass.

#### How ro tun

- Open link: http://lincread.com/traffic-lights-sim/
- Or host site locally. I use EasyPHP (http://www.easyphp.org/). Run index.html in the root folder.

#### How to use

The simulator includes two buttons:

- Press the 1x button to reset the simulation with default settings.
- Press the 30x button to reset the simulation and speed things up by 30.

##### 1x botton (default) settings applied:

- Traffic lights will change between red and green light every 5 minutes. 
- To warn incoming traffic about the change, yellow lights will be displayed 30 seconds before the lights change to red.
- The simulation resets itself after running for 30 minutes.

##### 30x button settings applied:

- Traffic lights will change every 10 seconds.
- Yellow lights are displayed for 1 second.
- The simulation resets itself after running for 1 minute.

##### A note on traffic and yellow lights

Cars continue through stop areas if already colliding with one when the light turns yellow. This simulates real traffic behaviour and ensures all cars can continue or stop safely, even when the 30x speed settings are applied.

##### Unit tests

You can turn on off unit testing for production builds in lib/impact/system.js by setting *runUnitTests* to false.

Since everything happens in real-time the unit tests are written to take this into account.

##### What did I write?

- lib/game/main.js
- lib/game/entities/* (all files)

##### How did I create the scene?

- Using Weltmeister. You can open it locally: http://127.0.0.1/[traffic-lights-sim]/weltmeister.html
- Open scene.js

##### Did I draw the art myself?
 
Yes, it's all Programmer's Art.
