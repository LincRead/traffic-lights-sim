# Traffic Lights Sim

This application simulates a set of traffic lights at an intersection. The traffic lights are designated (N, S) and (E, W) like a compass.

#### Buttons

The simulator includes two buttons:

- Press the 1x button to reset the simulation with default settings.
- Press the 30x button to reset the simulation and speed things up by 30.

##### 1x botton (default) settings applied:

- Traffic lights will change between red and green light every 5 minutes. 
- To warn incoming traffic about the change, yellow lights will be displayed 30 seconds before the lights change to red.
- The simulation resets itself after running for 30 minutes.

it switching to red.

##### 30x button settings applied:

The simulation also includes a 30x button to speeed things up:
- Traffic lights will change every 10 seconds.
- Yellow lights are displayed for 1 second.
- The simulation resets itself after running for 1 minute.

Cars pass through stop areas if already colliding with one when the light turns yellow. This ensures all cars can pass safely even with the 30x speed settings applied.

### What did I write?

- lib/game/main.js
- lib/game/entities/*
- 
## How did I create the scene?






