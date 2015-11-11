var canvas;
var a;
var over = 0;

function setup(){
  canvas = createCanvas(window.innerWidth,
                        window.innerHeight);
  canvas.canvas.style.height = null;
  canvas.canvas.style.width = null;
  colorMode(RGB,256);
}

function draw() {
  field();
  jiki();
  teki();
  gameover();
  istouchedteki();
  goal();
}

function field() {
  fill(0,200,256,256);
  rect(0,0,500,500);
  for (var i = 0; i < 11; i++) {
    line(50*i,0,50*i,500);
    line(0,50*i,500,50*i);
  }
}

//〜自機について〜
var jikiX = 200;
var jikiY = 450;
function jiki() {
  fill(256,100,100,256);
  rect(jikiX,jikiY,50,50);
}

//〜敵機について〜
var tekiX = 0;
var tekiY = 200;
var random;
function teki() {
  fill(256,256,50,256);
  rect(tekiX,tekiY,50,50);
}
var kyoriX,kyoriY;
function moveteki() {
  random = Math.floor(Math.random()*2);
  kyoriX = Math.abs(tekiX - jikiX);
  kyoriY = Math.abs(tekiY - jikiY);
  if (kyoriX < kyoriY && tekiY <= jikiY) {
    tekiY += 50;
  }else if (kyoriX < kyoriY && jikiY <= tekiY) {
    tekiY -= 50;
  }else if (kyoriY < kyoriX && tekiX <= jikiX) {
    tekiX += 50;
  }else if (kyoriY < kyoriX && jikiX <= tekiX) {
    tekiX -= 50;
  }else if (kyoriX == kyoriY) {
    if (random == 0 && tekiY <= jikiY) {
      tekiY += 50;
    }else if (random == 0 && jikiY <= tekiY) {
      tekiY -= 50;
    }else if (random == 1 && tekiX <= jikiX) {
      tekiX += 50;
    }else if (random == 1 && jikiX <= tekiX) {
      tekiX -= 50;
    }
  }
}

//キー押された時の動作をそれぞれ指定
function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    atari();
    moveteki();
  }
}

//当たり判定について
function atari() {
  if (keyCode === UP_ARROW) {
    atariup();
  }
  if (keyCode === DOWN_ARROW) {
    ataridown();
  }
  if (keyCode === LEFT_ARROW) {
    atarileft();
  }
  if (keyCode === RIGHT_ARROW) {
    atariright();
  }
}

function atariup() {
  if (jikiY != 50) {
    jikiY -= 50;
  }
}
function ataridown() {
  if (jikiY != 450) {
    jikiY += 50;
  }
}
function atarileft() {
  if (jikiX != 50) {
    jikiX -= 50;
  }
}
function atariright() {
  if (jikiX != 450) {
    jikiX += 50;
  }
}

function goal() {
  if (jikiX == 450 && jikiY == 0) {
    fill(50,256,50,256);
    rect(0,0,500,500);
  }
}


//ゲームオーバーについて
var kyoriX2,kyoriY2;
function istouchedteki() {
  kyoriX2 = Math.abs(tekiX - jikiX);
  kyoriY2 = Math.abs(tekiY - jikiY);
  if (kyoriX2 == 0 && kyoriY2 <= 50) {
    over = 256;
  }else if (kyoriX2 <= 50 && kyoriY2 == 0) {
    over = 256;
  }
}
function gameover() {
  fill(256,50,50,over);
  rect(0,0,500,500);
}
