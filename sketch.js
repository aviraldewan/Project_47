var Play = 1;
var end = 0;
var gameState = Play;
var pl,pi,bgi;
var bg_sound,gi,gGroup,g,ground,c,ci,cGroup;
var e = 50,w,wi,wGroup,distance = 0,bg2i;

function preload()
{
  bgi = loadImage("bg.jpg");
  pi = loadImage("p.png");
  bg_sound = loadSound("rain.mp3");
  gi = loadImage("gball.png");
  ci = loadImage("cash.png");
  wi = loadImage("log.png");
  bg2i = loadImage("bg2.jpg");
}

function setup() {
  createCanvas(1400,650);
  pl = createSprite(5915, 1130, 50, 50);
  pl.addImage(pi);
  pl.scale = 0.4;

  pl.setCollider("rectangle",0,0,25,25);
  pl.debug = false; 

  ground = createSprite(pl.x,pl.y + 10,displayWidth,10);
  ground.visible = false;

  gGroup = createGroup();
  cGroup = createGroup();
  wGroup = createGroup();

}

function draw() {
  background(0);  
  image(bgi,480,-displayHeight*2,displayWidth*4,displayHeight*4);

  camera.position.x = pl.x;
  camera.position.y = pl.y;

  pl.width = displayWidth;
  ground.x = pl.x;

  if (gameState === Play)
  {
      spawnG();
      spawnC();

      if (frameCount % 40 === 0)
      {
        bg_sound.play();
      }

      if (keyDown("left_arrow"))
      {
        pl.x -= 5;
        e -= 0.2;
        distance++;
      }
      else if (keyDown("right_arrow"))
      {
        pl.x += 5;
        e -= 0.2;
        distance++;
      }
      if (gGroup.isTouching(pl))
      {
        e++;
        g.destroy();
      }

      if (keyDown("space") && pl.y >= 1110)
      {
        pl.velocityY -= 4;
        e -= 0.3;
      }
      
      pl.velocityY += 0.8;

      pl.collide(ground);

      if (e <= 0)
      {
        gameState = end;
      }
      if (cGroup.isTouching(pl))
      {
        gameState = end;
      }
      if (pl.x >= 6300 && pl.y >= 1300)
      {
        pl.x = pl.x - 80;
        pl.y = 1129;
      }
      if (pl.x >= 6250)
      {
        image(bg2i,2100,-displayHeight*2.3,displayWidth*4,displayHeight*4);
      }
      else if (pl.x <= 5100)
      {
        image(bg2i,1100,-displayHeight*2.3,displayWidth*4,displayHeight*4);
      }
      fill('white');
      textSize(20);
      text("Energy: " + round(e),pl.x - 650,pl.y - 275);    
      if (pl.y >= 1140)
      {
        gameState = end;
      }
      spawnW();
      wGroup.collide(pl);
      pl.depth = wGroup.depth;
      pl.depth += 1;
      if (wGroup.isTouching(pl))
      {
        gameState = end;
      }
}

console.log(pl.x,pl.y);

if (gameState === end)
{
    background('cyan');
    fill('yellow');
    textSize(40);
    text("Game Over!",pl.x,pl.y - 100);
    gGroup.destroyEach();
    cGroup.destroyEach();
    wGroup.destroyEach();
}

  drawSprites();
}

function spawnG()
{
  if (frameCount % 80 === 0)
  {
    g = createSprite(random(pl.x - 10,pl.x - 400),pl.y,7,7);
    g.addImage(gi);
    g.scale = 0.1;
    g.lifetime = 200;
    gGroup.add(g);
  }
}

function spawnC()
{
  if (frameCount % 90 === 0)
  {
    c = createSprite(random(pl.x - 100,pl.x - 400),pl.y,7,7);
    c.addImage(ci);
    c.scale = 0.4;
    c.velocityX = 1;
    c.lifetime = 200;
    cGroup.add(c);
  }
}

function spawnW()
{
  if (frameCount % 200 === 0)
  {
    w = createSprite(random(pl.x - 100,pl.x - 400),random(pl.y - 10,pl.y - 50),20,30);
    w.addImage(wi);
    w.scale = 0.4;
    w.velocityX = 1;
    w.lifetime = 200;
    wGroup.add(w);
  }
}