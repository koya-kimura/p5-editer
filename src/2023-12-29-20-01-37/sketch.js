let theShader;
let pg;

let t = 0;

let bgm;
let fft;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
  bgm = loadSound("../../assets/sound/Particle_of_Lights_free_bgm_ver.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(width, height, WEBGL);

  fft = fft = new p5.FFT(0.8, 32);
}

function draw() {
  let spm = fft.analyze();
  for (let i in spm) {
    spm[i] = map(spm[i], 0, 255, 0, 1);
  }

  t += floor(pow(spm[20], 3)*14) + 1;

  pg.background(0);

  pg.push();

  const period = 100;
  const periodY = period+40;

  pg.rotateY(t/periodY);

  for(let i = 1; i < 15; i ++){
    pg.push();

    const periodX = period + 10 + i;
    const periodIndexX = floor(t / periodX);
    const normalX = Easing.easeOutExpo(fract(t / periodX));
    const rotationAngleX = PI / 2;

    const periodZ = period + 20 + i;
    const periodIndexZ = floor(t / periodZ);
    const normalZ = Easing.easeOutExpo(fract(t / periodZ));
    const rotationAngleZ = PI / 2;

    pg.rotateX(rotationAngleX * (periodIndexX + normalX));
    pg.rotateZ(rotationAngleZ * (periodIndexZ + normalZ));

    pg.strokeWeight(pow(spm[20], 3)*10);
    pg.stroke(120);
    pg.fill(255, 10);

    const s = 20 + 150 * Easing.easeInOutBack(pow(sin(t / 600), 10));
    pg.box(s*i + min(pow(spm[20]+0.2, 3), 1.2)*50);

    pg.pop();
  }

  pg.pop();

  shader(theShader);

  theShader.setUniform("u_tex", pg);
  theShader.setUniform("u_vol", spm[20]);
  theShader.setUniform("u_time", frameCount / 100);

  rect(0, 0, width, height);

  pg.remove();
}

function keyPressed() {
  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.setVolume(0.15)
    bgm.play();
  }
}

class Easing {
  static easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  static easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }

  static easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  static easeInQuad(x) {
    return x * x;
  }

  static easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  static easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  static easeInCubic(x) {
    return x * x * x;
  }

  static easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  static easeInQuart(x) {
    return x * x * x * x;
  }

  static easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  static easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  static easeInQuint(x) {
    return x * x * x * x * x;
  }

  static easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  static easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  static easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  static easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  static easeInOutExpo(x) {
    return x === 0 ?
      0 :
      x === 1 ?
      1 :
      x < 0.5 ?
      Math.pow(2, 20 * x - 10) / 2 :
      (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  static easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  static easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  static easeInOutCirc(x) {
    return x < 0.5 ?
      (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 :
      (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  static easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  static easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ?
      (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
      (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
}

const colorPalletes = [{
    name: "DeepEmeraldGold",
    colors: ["#005e55", "#fff9bf", "#edb50c", "#b8003d", "#5e001f"],
  },
  {
    name: "WarmRainbow",
    colors: ["#01204E", "#028391", "#F6DCAC", "#FAA968", "#F85525"],
  },
  {
    name: "ChocolateAndCream",
    colors: ["#D54751", "#EF9A48", "#FFFCC7", "#4DA394", "#59322B"],
  },
  {
    name: "PopArt",
    colors: ["#241965", "#653993", "#9F4094", "#B73D6E", "#F19406"],
  },
  {
    name: "DeepEmeraldGold",
    colors: ["#F87523", "#FFC31B", "#E7DCC9", "#1DB7B9", "#126D68"],
  },
];