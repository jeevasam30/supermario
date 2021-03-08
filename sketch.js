var mario ,mario_running;
var ground,groundImage,iground,bg,bgimage,brick,brickImage;
var score,display;
var PLAY = 1;
var END =0;
var gameState = PLAY;


function preload(){
  mario_running = loadAnimation("mario00.png", "mario01.png", "mario02.png","mario03.png");
  
  
  mario_hit = loadImage("collided.png");
  
   groundImage = loadImage("ground2.png")
  
  bgimage=loadImage("bg.png")
  
 
  obtaclesAction = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
   
  brickImage=loadImage("brick.png");
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  
}

function setup(){
  createCanvas(400,200) 
  
    
  
  bg= createSprite(200,180,1600,5);
   bg.addAnimation("ground",bgimage);
 
  
  //create a trex sprite
  mario = createSprite(80,145,20,50);
  mario.addAnimation("running", mario_running);
  
   ground = createSprite(200,180,1600,20);
   ground.addAnimation("ground",groundImage);
  //ground.x = ground.width /2;
   ground.scale=0.5;
  
  iground = createSprite(500,175,1600,20);
  iground.visible= false; 
  
  
  gameOver = createSprite(190,85);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(190,110);
  restart.addImage(restartImg);
  
  
  gameOver.scale = 0.4;
  restart.scale = 0.4;
  
    obstaclesGroup = createGroup();
  brickGroup = createGroup();
  
  mario.setCollider("circle",3,15,3);
   mario.debug = false
  
 
  score = 0;
  
}

function draw(){
  background("white")
  console.log(mouseX,mouseY);
  
 
  
  if(gameState === PLAY){
     gameOver.visible = false
    restart.visible = false
     ground.velocityX = -4
     if (ground.x < 0){
    ground.x = 300;
  }
  }  
    
     if(keyDown("space") && mario.y >= 100) {
    mario.velocityY = -12;
  }
  mario.velocityY = mario.velocityY + 0.8
  
    scoreply();
    spawnObstacles();
     spawnbrick();
    
     if(obstaclesGroup.isTouching(mario)){
        gameState = END;
    
  }
    
    else if (gameState === END) {
       
      gameOver.visible = true;
      restart.visible = true;
     
       ground.velocityX = 0;
      mario.velocityY = 0;
      
       
      mario.changeAnimation("collided",mario_hit);
      obstaclesGroup.setLifetimeEach(-1);
    brickGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     brickGroup.setVelocityXEach(0)
      
    }
    
  
   
  //console.log(mario.y);
 
 
  //console.log(ground.x)
 
  
 
  mario.collide(iground);
  drawSprites();
   fill(0)
  textSize(20)
  text("Score=" + score, 20, 20)
  
  
  

}
function spawnbrick() {
  //write code here to spawn the clouds
  if (frameCount%200=== 0) {
    brick = createSprite(600,100,40,10);
    brick.addImage(brickImage)
    brick.y = 100
    brick.scale = 0.6;
    brick.velocityX = -2;
    brickGroup.add(brick);
    
    

    
    //adjust the depth
   /* brick.depth = mario.depth
    mario.depth = brick.depth + 1;*/
    }
}

function scoreply(){
  if(brickGroup.isTouching(mario)){
    brickGroup.visible = false;
    score = score +1;
  }
}




function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(400,145,10,40);
   obstacle.addAnimation("action", obtaclesAction );
   
   obstacle.velocityX = -2;

   
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale =0.6;
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
 }
}