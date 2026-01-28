const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

/* Landscape lock */
function checkOrientation() {
  const warn = document.getElementById("rotate-warning");
  warn.style.display = innerWidth < innerHeight ? "flex" : "none";
}
setInterval(checkOrientation, 300);

/* Player */
const player = {
  x: 150,
  y: 300,
  size: 40,
  velY: 0,
  gravity: 1.2,
  jump: -18,
  grounded: false
};

let camX = 0;
let playing = false;

/* Music */
const music = new Audio(LEVEL.music);

/* Controls */
addEventListener("pointerdown", () => {
  if (player.grounded && playing) {
    player.velY = player.jump;
    player.grounded = false;
  }
});

/* Start */
document.getElementById("startBtn").onclick = () => {
  document.getElementById("overlay").style.display = "none";
  music.currentTime = 0;
  music.play();
  playing = true;
  loop();
};

/* Collision */
function rectHit(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.size > b.x &&
    a.y < b.y + b.h &&
    a.y + a.size > b.y
  );
}

/* Loop */
function loop() {
  if (!playing) return;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  camX += LEVEL.speed;

  /* Player physics */
  player.velY += player.gravity;
  player.y += player.velY;
  player.grounded = false;

  if (player.y + player.size > 420) {
    player.y = 420 - player.size;
    player.velY = 0;
    player.grounded = true;
  }

  /* Blocks */
  LEVEL.blocks.forEach(b => {
    let bx = b.x - camX;
    let by = b.y;

    if (b.moveY) {
      by += Math.sin(Date.now()/300) * 30;
    }

    ctx.fillStyle = "#00ffff";
    ctx.fillRect(bx, by, b.w, b.h);

    if (rectHit(player, {x:bx,y:by,w:b.w,h:b.h})) {
      player.y = by - player.size;
      player.velY = 0;
      player.grounded = true;
    }
  });

  /* Spikes */
  LEVEL.spikes.forEach(s => {
    let sx = s.x - camX;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(sx, s.y + 40);
    ctx.lineTo(sx + 20, s.y);
    ctx.lineTo(sx + 40, s.y + 40);
    ctx.fill();

    if (
      player.x + player.size > sx &&
      player.x < sx + 40 &&
      player.y + player.size > s.y
    ) {
      location.reload();
    }
  });

  /* Player draw */
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  requestAnimationFrame(loop);
}
