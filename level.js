const LEVELS = [
  {
    name: "Game On",
    music: "assets/gameon.mp3",
    bpm: 130,
    speed: 5,
    length: 3000,
    objects: [
      // ground
      { x: 0, y: 260, w: 4000, h: 40, type: "ground" },

      // intro jumps (tiap beat)
      { x: 400, y: 220, w: 40, h: 40, type: "block" },
      { x: 520, y: 200, w: 40, h: 60, type: "block" },

      // spike ringan
      { x: 680, y: 240, type: "spike" },
      { x: 760, y: 240, type: "spike" },

      // back-on-track style rising blocks
      { x: 900, y: 210, w: 40, h: 90, type: "block" },
      { x: 1020, y: 180, w: 40, h: 120, type: "block" },

      // break
      { x: 1180, y: 240, type: "spike" },

      // end section
      { x: 1350, y: 200, w: 40, h: 100, type: "block" },
      { x: 1500, y: 170, w: 40, h: 130, type: "block" }
    ]
  }
];
