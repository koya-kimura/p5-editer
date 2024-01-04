let bgm;
let fft;

const particleNum = 1000;
let particles = [];

function preload(){
  bgm = loadSound("../../assets/sound/Kikai-Jikake-no-Kokoro_Long_FreeVer.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fft = fft = new p5.FFT(0.8, 32);

  for(let i = 0; i < particleNum; i ++){
    particles.push(new Particle());
  }
}

function draw() {
  let spm = fft.analyze();
  for (let i in spm) {
    spm[i] = map(spm[i], 0, 255, 0, 1);
  }


  background(255 - pow(spm[25], 3) * 100, 255 - pow(spm[25], 3) * 50, 230+sin(frameCount/200)*100, 100);

  for(let i in spm){
    fill(255, pow(spm[10], 2)*255);
    stroke(200, 230, 255);
    circle(width/2, height/2, spm[i]*min(width, height)*0.8);
  }

  for(let i in particles){
    particles[i].move();
    particles[i].display(spm[20]);
  }
}

class Particle {
  constructor(){
    this.p = createVector(random(width), height + 100);
    this.px = this.p.x;
    this.r = random(100);
    this.v = createVector(0, -random(1, 5));
    this.s = random(10);
  }

  move(){
    this.p.add(this.v);
    this.p.x = this.px + this.r * sin(frameCount/100);
    if(this.p.y < -100){
      this.p.y = height + 100;
    }
  }

  display(_scl){
    noStroke();
    fill(240, 245, 255);
    circle(this.p.x, this.p.y, this.s+pow(_scl, 2)*this.s);
  }
}

function mousePressed() {
  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.setVolume(0.3)
    bgm.loop();
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

const colorPalletes = [
  {
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