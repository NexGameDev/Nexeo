const LEVEL = {
  name: "GAME ON",
  music: "assets/gameon.mp3",
  speed: 6,

  blocks: [
    { x: 400, y: 320, w: 60, h: 60 },
    { x: 550, y: 280, w: 60, h: 100 },
    { x: 700, y: 240, w: 60, h: 140 },

    { x: 1000, y: 350, w: 80, h: 30, moveY: true },
    { x: 1200, y: 300, w: 80, h: 30, moveY: true },
  ],

  spikes: [
    { x: 850, y: 380 },
    { x: 880, y: 380 },
    { x: 910, y: 380 },

    { x: 1400, y: 380 },
    { x: 1430, y: 380 },
  ]
};
