const n = 6;
let rectangle = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  const s = createVector(width / n, height / n);
  const cp = random(colorPalletes).colors;
  for (let x = 0; x < n + 1; x++) {
    for (let y = 0; y < n; y++) {
      rectangle.push(new Rect(x * s.x, y * s.y, s.x, s.y, cp, floor(noise(x,y)*1000)));
    }
  }
}

function draw() {
  background(250);

  strokeWeight(1);
  stroke(220);
  gridLine(20);

  const period = 700;
  for (let i in rectangle) {
    rectangle[i].move();
    rectangle[i].display(max(abs(frameCount%period-period*0.5)-period*0.2, 0)/(period*0.15));
  }
}

class Rect {
  constructor(x, y, w, h, cp, i) {
    this.index = i;

    this.pg = createGraphics(w, h);
    this.p = createVector(x, y);
    this.v = createVector(-1, 0);
    this.s = createVector(w, h);
    this.d = random([createVector(1, 0), createVector(-1, 0), createVector(0, 1), createVector(0, -1)]);

    this.cp = cp;
    this.bg = random(cp);
    this.c = random(cp);
  }

  move() {
    this.p.add(this.v);
    if (this.p.x < -this.s.x) {
      this.p.x = width;
    }
  }

  pgDraw(x, y, w, h){
    this.pg.push();

    this.pg.translate(x, y);
    this.pg.background(this.bg);
    this.pg.noStroke();
    this.pg.fill(this.c);
    this.pg.rect(0, 0, w, h);

    for(let i = 0; i < 5; i ++){
      this.pg.fill(this.cp[floor(noise(this.index, i)*this.cp.length)]);
      this.pg.circle(w / 2, h / 2, min(w+h) * 0.15 + min(w+h) * 0.15 * sin(this.index + i + frameCount / (this.index/20+20)));
    }

    this.pg.pop();
  }

  display(t) {
    let pos = this.s.copy().mult(Easing.easeInOutExpo(t));
    pos.mult(this.d);

    this.pgDraw(pos.x, pos.y, this.s.x, this.s.y);

    const scl = 0.9;
    image(this.pg, this.p.x, this.p.y, this.s.x*scl, this.s.y*scl);
    this.pg.remove();
  }
}

function gridLine(grid) {
  for (let x = grid / 2; x < width; x += grid) {
    line(x, 0, x, height);
  }
  for (let y = grid / 2; y < height; y += grid) {
    line(0, y, width, y);
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
  {
    name: "GreenPink",
    colors: ["#01B999", "#FAB3B3", "#DC958F", "#A1D8CE", "#F1FAF7"],
  },
  {
    name: "NatureTranquility",
    colors: ["#106A6B", "#07374B", "#CAB381", "#E9E0CE"],
  },
  {
    name: "VibrantHarmony",
    colors: ["#F15946", "#5681CB", "#FAAA2D", "#296647", "#453945"],
  },
  {
    name: "Serenity Bliss",
    colors: ["#FFB4B8", "#EF4B28", "#0A563A", "#FFBC54", "#ECE9E0"],
  }
];