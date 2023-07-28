const canvasE1 = document.querySelector("canvas"),
  canvasCtx = canvasE1.getContext("2d");
const lineWidth = 15,
  gapX = 15,
  mouse = { x: 0, y: 0 };

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
    canvasCtx.fillStyle = "#bf40bf";
    canvasCtx.fillRect(0, 0, this.w, this.h);
  },
};

const score = {
  human: 0,
  computer: 0,
  increaseHuman: function () {
    this.human++;
  },
  increaseComputer: function () {
    this.computer++;
  },
  draw: function () {
    canvasCtx.font = "60px Oxanium";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#9400d3";
    canvasCtx.fillText("Player:", field.w / 8, 50);
    canvasCtx.fillText(this.human, field.w / 4, 50);
    canvasCtx.fillText("CPU:", (2 * field.w) / 3.1, 50);
    canvasCtx.fillText(this.computer, (2 * field.w) / 2.68, 50);
  },
};

const line = {
  w: 15,
  h: field.h,
  draw: function () {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h);
  },
};

const player1 = {
  x: gapX,
  y: line.h,
  w: line.w,
  h: 200,
  speed: 5,
  _move: function () {
    this.y = mouse.y;
  },
  _speedUp: function(){
    this.speed++
  },
  draw: function () {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

const player2 = {
  x: field.w - line.w - gapX,
  y: field.h / 2,
  w: line.w,
  h: 200,
  speed: 2,
  _move: function () {
    if (this.y + this.h / 2 <ball.y + ball.r){
        this.y += this.speed-0.4
    } else{
        this.y -= this.speed
    }
  },
  _speedUp : function (){
    this.speed+=0.5

    if (this.speed >= 22){
        this.speed = this.speed/2.5
    }
  },
  draw: function () {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

const block1 = {
    x: player1.x + player1.w,
    y: 0,
    w: gapX - player1.w,
    h: field.h,
    visible: false,
    draw: function () {
      if (this.visible) {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
      }
    },
};
  
const block2 = {
    x: player2.x,
    y: 0,
    w: gapX - player2.w,
    h: field.h,
    visible: false,
    draw: function () {
      if (this.visible) {
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
      }
    },
};

const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    speed: 5,
    directionY: 1,
    directionX: 1,
    _calcPosition: function () {
      if (this.x - this.r < player1.x + player1.w && this.y > player1.y && this.y < player1.y + player1.h) {
        this._reverseX();
        this.speed+=0.5
      } else if (this.x - this.r < block1.x + block1.w && this.y > block1.y && this.y < block1.y + block1.h) {
        score.increaseComputer();
        this._pointFlag();
      }
  
      if (this.x + this.r > player2.x && this.y > player2.y && this.y < player2.y + player2.h) {
        this._reverseX();
        this.speed-=0.5
      } else if (this.x + this.r > block2.x && this.y > block2.y && this.y < block2.y + block2.h) {
        score.increaseHuman();
        this._pointFlag();
      }
  
      if (this.y - this.r < 0 && this.directionY < 0) {
        this._reverseY();
      } else if (this.y + this.r > field.h && this.directionY > 0) {
        this._reverseY();
      }
    },
    _reverseX: function () {
      this.directionX = this.directionX * -1;
    },
    _reverseY: function () {
      this.directionY = this.directionY * -1;
    },
    _move: function () {
      this.x += this.directionX * this.speed;
      this.y += this.directionY * this.speed;
    },
    _speedUp: function(){
        this.speed+=2

        if(this.speed >= 50){
            this.speed = this.speed/2.8
        }
    },
    _pointFlag: function () {
      this.x = field.w / 2;
      this.y = field.h / 2;

      this._speedUp();
      this._reverseX();
      player1._speedUp();
      player2._speedUp();
    },
    draw: function () {
      canvasCtx.fillStyle = "#ffffff";
      canvasCtx.beginPath();
      canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      canvasCtx.fill();
  
      this._calcPosition();
      this._move();
    },
};
  
window.animationFrame =
  (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitURLRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

function setup() {
  canvasE1.width = canvasCtx.width = window.innerWidth;
  canvasE1.height = canvasCtx.width = window.innerHeight;
}

function draw() {
  field.draw();
  line.draw();
  player1.draw();
  player2.draw();
  block1.draw();
  block2.draw();
  ball.draw();
  score.draw();
}

function main() {
  animationFrame(main);
  draw();
}

main();
setup();

canvasE1.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});
