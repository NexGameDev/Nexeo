const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* UI */
const menu = document.getElementById("menu");
const levelSelect = document.getElementById("levelSelect");

document.getElementById("playBtn").onclick = () => {
  menu.classList.add("hidden");
  levelSelect.classList.remove("hidden");
};

document.querySelectorAll(".levelBtn").forEach(btn => {
  btn.onclick = () => {
    levelSelect.classList.add("hidden");
    startLevel(LEVELS[btn.dataset.level]);
  };
});

/* MUSIC */
let music;
function playLevelMusic(src) {
  if (music) {
    music.pause();
    music.currentTime = 0;
  }

  music = new Audio(src);
  music.loop = true;
  music.volume = 0.6;
  music.play();
}

/* GAME STATE */
let player, level, camX, running;

/* PHYSICS */
const GRAVITY = 0.9;
const JUMP_FORCE = -14;

/* INPUT */
function jump() {
  if (player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }
}
document.addEventListener("touchstart", jump);
document.addEventListener("mousedown", jump);

/* START LEVEL */
function startLevel(lvl) {
  level = lvl;
  camX = 0;
  running = true;

  player = {
    x: 100,
    y: 200,
    w: 30,
    h: 30,
    vy: 0,
    onGround: false
  };

  playLevelMusic(level.music);
  requestAnimationFrame(loop);
}

/* MAIN LOOP */
function loop() {
  if (!running) return;

  camX += level.speed;

  // physics
  player.vy += GRAVITY;
  player.y += player.vy;
  player.onGround = false;

  for (const o of level.objects) {
    const ox = o.x - camX;

    // collision block/ground
    if (o.type === "ground" || o.type === "block") {
      if (
        player.x < ox + o.w &&
        player.x + player.w > ox &&
        player.y + player.h <= o.y + 10 &&
        player.y + player.h + player.vy >= o.y
      ) {
        player.y = o.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }

    // spike = death
    if (o.type === "spike") {
      if (
        player.x + player.w > ox &&
        player.x < ox + 30 &&
        player.y + player.h > o.y
      ) {
        running = false;
        music.pause();
        setTimeout(() => location.reload(), 300);
      }
    }
  }

  // draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // player
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // objects
  for (const o of level.objects) {
    const ox = o.x - camX;

    if (o.type === "ground" || o.type === "block") {
      ctx.fillStyle = "#555";
      ctx.fillRect(ox, o.y, o.w, o.h);
    }

    if (o.type === "spike") {
      ctx.fillStyle = "#ff3333";
      ctx.beginPath();
      ctx.moveTo(ox, o.y + 30);
      ctx.lineTo(ox + 15, o.y);
      ctx.lineTo(ox + 30, o.y + 30);
      ctx.fill();
    }
  }

  requestAnimationFrame(loop);
    }
