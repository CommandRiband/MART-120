var player;
var gameState ="play";
var obGroup;
var edges,leftedge,bottomedge,rightedge,topedge;
var ob;
var flag=false;

function setup()
{
  createCanvas(400,400);
  
  // 1

  //creating the edges of the canvas
  edges=createEdgeSprites();

  //function call for creating the player
  createPlayer();
}

function draw()
{
  background("white");
  if(flag==true)
  {
    fill("red");
    circle(200,200,50);
  }
    
  //function call for creation of borders and exit
  createBordersAndExit();
  
  // state of the game when it is being played  by the players
  if(gameState =="play")
  {
    //function call for moving the player using up,fown,left,right arrow keys
    movePlayer();

    //function call for generating obstacles
    obstacles();

    //detecting obstacles bouncing off from all edges except exit
    obGroup.bounce(rightedge);
    obGroup.bounce(leftedge);
    obGroup.bounce(bottomedge);
    obGroup.bounce(topedge);

    // detecting if the player touches the obstacles
   // if(player.isTouching(obGroup))
   // {
   //   gameState="end";
    //}

    // drawing all sprites
    drawSprites();
  }
  
  //state of the game when the game is ended
  else if(gameState=="end")
  {
    text("Game Over!! You lose!",175,200 );
    obGroup.setVelocityXEach(0);
    obGroup.setVelocityYEach(0);
  }
  
  // state of the game when player successfully leaves the exit
 // if(player.isTouching(edges))
 // {
 //   text("You Won!",175,200 );
 //   obGroup.setVelocityXEach(0);
 //   obGroup.setVelocityYEach(0);
 // }


}

function createEdgeSprites()
{
  //creation  of the group of obstacles
  obGroup = new Group();
}

// definition for creating player
function createPlayer()
{
  player = createSprite(10,390,20,20);
  player.shapeColor="red";
 
}

//definition for moving player
function movePlayer()
{
  if(keyIsDown(RIGHT_ARROW))
  {
    player.x=player.x+2;
   }
  if(keyIsDown(LEFT_ARROW))
  {
    player.x=player.x-2;
   }
  if(keyIsDown(UP_ARROW))
  {
    player.y=player.y-2;
   }
  if(keyIsDown(DOWN_ARROW))
  {
    player.y=player.y+2;
   }
}

// detection of mous click that creates a circle
function  mouseClicked()
{
  flag=true;
  
}

//definition for creating obstacles
function obstacles()
{
  if(frameCount % 60 === 0)
  {
    ob=   createSprite(random(10,390),random(10,390),random(10,100),random(10,100));
    ob.shapeColor=color(random(0,255), random(0,255), random(0,255));

    ob.velocityX=random(-4,4);
    ob.velocityY= random(-4,4)   ;

    obGroup.add(ob);

  }
  
}

//definition for creating borders and exit
function createBordersAndExit()
{
   leftedge= createSprite(5,200,10,400);
   topedge= createSprite(200,5,400,10);
   bottomedge= createSprite(200,395,400,10);
   rightedge=createSprite(395,250,10,300);
  
  player.bounce(leftedge);
  player.bounce(rightedge);
  player.bounce(bottomedge);
  player.bounce(topedge);

  text('EXIT',350,30);
}