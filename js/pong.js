// --------------------------------------------- //
// --------------------------------------------- //
// ------------- PONG with Three.JS ------------ //
// --------------------------------------------- //
// ------------ Alvaro Martin Menacho ---------- //
// --------------------------------------------- //
// ------------- Graficos y 3D URJC ------------ //
// --------------------------------------------- //
// --------------------------------------------- //



// ------------ GLOBAL VARIABLES --------------- //



// Scene size
var container;
const WIDTH = 640;
const HEIGHT = 360;

// Camera attributes
const VIEW_ANGLE = 50;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

// Scene object variables
var renderer, scene, camera, pointLight, spotLight;

// Ball vars
const RADIUS = 5;
const SEGMENTS = 6;
const RINGS = 6;

var ballDirX = 1, ballDirY = 1, ballSpeed = 2;
var MaxSpeed = ballSpeed * 2;

// Plane vars
const FIELD_WIDTH = 400,
      FIELD_HEIGTH = 200;

const PLANE_WIDTH = FIELD_WIDTH,
      PLANE_HEIGTH = FIELD_HEIGTH,
      PLANE_QUALITY = 10;

const BORDER_WIDTH = PLANE_WIDTH + 20,
      BORDER_HEIGTH = PLANE_HEIGTH + 20,
      BORDER_DEPTH = 10,
      BORDER_QUALITY = 1;

// Lateral Steps vars
const STEP_WIDTH = 420,
      STEP_HEIGTH = 20,
      STEP_DEPTH1 = 40,
      STEP_DEPTH2 = 60,
      STEP_DEPTH3 = 80,
      STEP_QUALITY = 10;

// Paddles vars
const PADDLE_WIDTH = 10,
	  PADDLE_HEIGTH = 30,
	  PADDLE_DEPTH = 15,
	  PADDLE_QUALITY = 1;

var playerPaddleDirY = 0,
	  cpuPaddleDirY = 0,
	  paddleSpeed = 4;

var paddlelimit = (PLANE_HEIGTH/2) - (PADDLE_HEIGTH/2);
var goalLimit = (BORDER_WIDTH/2);

// Score vars
var score1 = 0,
	score2 = 0,
	maxScore = 7;

// Objects to play with
var plane;
var ball;
var playerPaddle;
var cpuPaddle;



// ------------ SET UP ALL 3D OBJECTS --------------- //



function setup()
{	
	createScene();
	addPlaneMesh();
	addLateralStepsMesh();
    addBallMesh();
    addPaddleMesh();
    addLight();
    addSpotLight();
    requestAnimationFrame(draw);
}

function createScene()
{	
	// Get the DOM element to attach to
    container = document.getElementById('gameCanvas');

    // Create a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

    scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // For Spot Light use
    renderer.shadowMapEnabled = true;

    // Attach the renderer-supplied DOM element.
    container.appendChild(renderer.domElement);
}

function addPlaneMesh()
{
    var geometry1 = new THREE.PlaneGeometry(
        PLANE_WIDTH,
        PLANE_HEIGTH,
        PLANE_QUALITY,
        PLANE_QUALITY);

    var material = new THREE.MeshLambertMaterial(
      {
        color: '#400080'
      });

    // Create a new mesh with plane geometry
    plane = new THREE.Mesh(geometry1, material);

    // Move the plane back in Z so we can see it
    plane.position.z = -250;

    // Shadows
    plane.receiveShadow = true;

    // Finally, add the plane to the scene
    scene.add(plane);

    // Add a border
    var geometry2 = new THREE.CubeGeometry(
        BORDER_WIDTH,
        BORDER_HEIGTH,
        BORDER_DEPTH,
        BORDER_QUALITY);
    


        var texture = new THREE.TextureLoader().load('Textures/madera.jpg');
    var material = new THREE.MeshBasicMaterial( { map: texture } );

    border = new THREE.Mesh(geometry2, material);
    border.position.z = -255.1;

    // Shadows
    border.receiveShadow = true;

    scene.add(border);
}

function addLateralStepsMesh()
{
    var geometry1 = new THREE.CubeGeometry(
        STEP_WIDTH,
        STEP_HEIGTH,
        STEP_DEPTH1,
        STEP_QUALITY);

    var geometry2 = new THREE.CubeGeometry(
        STEP_WIDTH,
        STEP_HEIGTH,
        STEP_DEPTH2,
        STEP_QUALITY);

    var geometry3 = new THREE.CubeGeometry(
        STEP_WIDTH,
        STEP_HEIGTH,
        STEP_DEPTH3,
        STEP_QUALITY);
    
    var material1 = new THREE.MeshLambertMaterial(
      {
        color: '#400080'
      });

    var material2 = new THREE.MeshLambertMaterial(
      {
        color: '#ff71ce'
      });

    	

    // Create 3 steps for each side
    step1 = new THREE.Mesh(geometry1, material1);
    step2 = new THREE.Mesh(geometry2, material2);
    step3 = new THREE.Mesh(geometry3, material1);
    step4 = new THREE.Mesh(geometry1, material1);
    step5 = new THREE.Mesh(geometry2, material2);
    step6 = new THREE.Mesh(geometry3, material1);

    steps = [step1, step2, step3, step4, step5, step6];

    // Move to their respective coordinates
	step1.position.y = 120;
	step2.position.y = 140;
	step3.position.y = 160;
	step4.position.y = -120;
	step5.position.y = -140;
	step6.position.y = -160;

    step1.position.z = -240;
    step2.position.z = -230;
    step3.position.z = -220;
    step4.position.z = -240;
    step5.position.z = -230;
    step6.position.z = -220;

    // Shadows
      for (step in steps) {
    	steps[step].castShadow = true;
    	steps[step].recieveShadow = true;
  }

    // Finally, add to the scene
    scene.add(step1);
    scene.add(step2);
    scene.add(step3);
    scene.add(step4);
    scene.add(step5);
    scene.add(step6);
}

function addBallMesh()
{
    var geometry = new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS);

    var material = new THREE.MeshLambertMaterial(
      {
        color: '#7def67'
      });

    // Create a new mesh with sphere geometry
    ball = new THREE.Mesh(geometry, material);

    // Move the ball back in Z so we can see it. X & Y = 0 by default.
    ball.position.z = -245;

    // Shadows
    ball.castShadow = true;
	ball.receiveShadow = true;

    // Finally, add the ball to the scene
    scene.add(ball);    
}

function addPaddleMesh()
{
    var geometry = new THREE.CubeGeometry(
        PADDLE_WIDTH,
	    PADDLE_HEIGTH,
	    PADDLE_DEPTH,
	    PADDLE_QUALITY);

    var materialplayer = new THREE.MeshLambertMaterial(
      {
        color: '#0080ff'
      });

    var materialcpu = new THREE.MeshLambertMaterial(
      {
        color: '#ffff66'
      });

    // Create a new mesh with cube geometry
    playerPaddle = new THREE.Mesh(geometry, materialplayer);
    cpuPaddle = new THREE.Mesh(geometry, materialcpu);

    // Move the Paddles to their position
    playerPaddle.position.x = -195;
    cpuPaddle.position.x = 195;
    playerPaddle.position.z = -245;
    cpuPaddle.position.z = -245;

    // Shadows
    playerPaddle.receiveShadow = true;
    cpuPaddle.receiveShadow = true;

    // Finally, add the paddles to the scene
    scene.add(playerPaddle);
    scene.add(cpuPaddle);
}

function addLight()
{
    // Create a point light
    pointLight = new THREE.PointLight(0xFFFFFF, 1);

    // Set its position
    pointLight.position.x = -300;
    pointLight.position.y = 0;
    pointLight.position.z = 0;

    // Add to the scene
    scene.add(pointLight);
}

function addSpotLight()
{
	// Create a spot light
    spotLight = new THREE.SpotLight(0xFFFFFF, 0.75);

    // Set its position
    spotLight.position.set(0, 0, 150);

    // Turn on shadows
    spotLight.castShadow = true;

    // Add to the scene
    scene.add(spotLight);
}



// ------------ GAME FUNCTIONS --------------- //



function draw()
{	
	// Draw!
    renderer.render(scene, camera);

    // Schedule the next frame
    requestAnimationFrame(draw);

    // GAMEPLAY
    cameraBehind();
    ballMovement();
    playerMovement();
    cpuMovement();
    hitBall();
    goal();
    end_of_game();
}

// Move the camera behind the Player paddle
function cameraBehind()
{   

	camera.position.x = playerPaddle.position.x - 110;
	camera.position.y += (playerPaddle.position.y - camera.position.y) * 0.1;
	camera.position.z = playerPaddle.position.z + 100;
	
	// Rotate the camera
	camera.rotation.y = -60 * Math.PI/180;
	camera.rotation.z = -90 * Math.PI/180;

	// Make spotlight follow the ball
	spotLight.position.x = -ball.position.x * 1.25;
	spotLight.position.y = -ball.position.y * 1.25;
}

// Move the ball
function ballMovement()
{
	// Limit ball's speed to 2x
	if (ballDirY >= MaxSpeed)
	{
		ballDirY = MaxSpeed;
	}
	else if (ballDirY <= -MaxSpeed)
	{
		ballDirY = -MaxSpeed;
	}

	// Limit top  & bottom side
	if (ball.position.y <= -PLANE_HEIGTH/2 || ball.position.y >= PLANE_HEIGTH/2)
	{
		ballDirY = -ballDirY;

		// Wall hit sound
		var wall = new Audio('Sounds/pong_wall.wav');
		wall.play();
	}

	// The ball moves by itself
	ball.position.x += ballDirX * ballSpeed;
	ball.position.y += ballDirY * ballSpeed;
}

// Move the Player paddle
function playerMovement()
{
	// Move up & Down PlayerPaddle
	if (Key.isDown(Key.A))
	{
		playerPaddleDirY = paddleSpeed;
	}
	else if (Key.isDown(Key.D))
	{
		playerPaddleDirY = -paddleSpeed;
	}
	else
	{
		playerPaddleDirY = 0;
	}

	playerPaddle.position.y += playerPaddleDirY;

	// Player paddle limited to the border
	if (playerPaddle.position.y <= -paddlelimit)
	{
		playerPaddle.position.y = -paddlelimit;
	}
	else if (playerPaddle.position.y >= paddlelimit)
	{
		playerPaddle.position.y = paddlelimit;
	}
}

// Move the Cpu paddle following the ball
function cpuMovement()
{
	// Set opponent reaction rate (0-easiest, 1-hardest)
	var difficulty = 0.5;

	// Make Cpu Paddle follow the ball
	cpuPaddleDirY = (ball.position.y - cpuPaddle.position.y) * difficulty;

	
	if (Math.abs(cpuPaddleDirY) <= paddleSpeed)
	{
		cpuPaddle.position.y += cpuPaddleDirY;
	}
	else

	// Limit the speed
	{
		if (cpuPaddleDirY >= paddleSpeed)
		{
			cpuPaddle.position.y += paddleSpeed;
		}
		else if (cpuPaddleDirY <= -paddleSpeed)
		{
			cpuPaddle.position.y -= paddleSpeed;
		}
	}

	// Cpu paddle limited to the border
	if (cpuPaddle.position.y <= -paddlelimit)
	{
		cpuPaddle.position.y = -paddlelimit;
	}
	else if (cpuPaddle.position.y >= paddlelimit)
	{
		cpuPaddle.position.y = paddlelimit;
	}
}

// The paddles hit the ball when it goes into them, limiting their pasotion x & y
function hitBall()
{
	// Player hitting the ball
	if (ball.position.x <= playerPaddle.position.x + PADDLE_WIDTH
	&& ball.position.x >= playerPaddle.position.x)
	{
		if (ball.position.y <= playerPaddle.position.y + PADDLE_HEIGTH/2
		&& ball.position.y >= playerPaddle.position.y - PADDLE_HEIGTH/2)
		{
			if (ballDirX < 0)
			{
				ballDirX = -ballDirX;
				ballDirY += playerPaddleDirY * 0.3;

				// Paddle hit sound
				var ping = new Audio('Sounds/pong_hit.wav');
				ping.play();
			}
		}
	}

	// CPU hitting the ball
	if (ball.position.x >=  cpuPaddle.position.x - PADDLE_WIDTH
	&& ball.position.x <= cpuPaddle.position.x)
	{
		if (ball.position.y <= cpuPaddle.position.y + PADDLE_HEIGTH/2
		&& ball.position.y >= cpuPaddle.position.y - PADDLE_HEIGTH/2)
		{
			if (ballDirX > 0)
			{
				ballDirX = -ballDirX;
				ballDirY += playerPaddleDirY * 0.3;

				// Paddle hit sound
				var pong = new Audio('Sounds/pong_hit.wav');
				pong.play();
			}
		}
	}
}

// When player or cpu score
function goal()
{
	document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";

	// Player goal
	if (ball.position.x >= goalLimit)
	{
		score1 += 1;
		document.getElementById("scores").innerHTML = score1 + "-" + score2;

		// Reset the ball speed and move to cpu
		ball.position.x = 0;
		ball.position.y = 0;
		ballDirX = -1;
		ballDirY = 1;
		ballSpeed = 2;

		// Goal sound
		var pong_fail = new Audio('Sounds/pong_fail.wav');
		pong_fail.play();pong_fail
	}

	// Cpu goal
	if (ball.position.x <= -goalLimit)
	{
		score2 += 1;
		document.getElementById("scores").innerHTML = score1 + "-" + score2;

		// Reset the ball speed and move to player
		ball.position.x = 0;
		ball.position.y = 0;
		ballDirX = 1;
		ballDirY = 1;
		ballSpeed = 2;

		// Goal sound
		var pong_fail = new Audio('Sounds/pong_fail.wav');
		pong_fail.play();pong_fail
	}
}

// The match end when one of the players reach the maxScore limit
function end_of_game()
{
	if (score1 == maxScore)
	{
		ball.position.x = 0;
		ball.position.y = 0;
		ballSpeed = 0;
		document.getElementById("scores").innerHTML = "YOU WON";
		document.getElementById("winnerBoard").innerHTML = "Refresh to replay!";
	}
	else if (score2 == maxScore)
	{
		ball.position.x = 0;
		ball.position.y = 0;
		ballSpeed = 0;
		document.getElementById("scores").innerHTML = "YOU LOSE";
		document.getElementById("winnerBoard").innerHTML = "Refresh to replay!";
	}
}