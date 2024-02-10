const grid = 100;
let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  specularMaterial(200);

  stroke(255);
  fill(255, 100);

  for(let x = -grid/2; x <= grid/2; x += grid){
    for (let y = -grid / 2; y <= grid / 2; y += grid) {
      for (let z = -grid / 2; z <= grid / 2; z += grid) {
        boxes.push(new Box(x, y, z, grid));
      }
    }
  }
}

function draw() {
  const t = frameCount / 50;

  background(0);

  camera(500*cos(t/5), -300, 500*sin(t/5), 0, 0, 0, 0, 1, 0);

  ambientLight(50);
  pointLight(255, 0, 0, 500, 500, 500);
  pointLight(0, 255, 0, -500, -500, -500);
  pointLight(0, 0, 255, 500, -500, 500);

  for(let i in boxes){
    let time = 0;
    const fl = floor(t);
    const fr = fract(t);

    if(fl%16<8){
      if(fl%8<i){
        time=0;
      } else if(fl%8==i){
        time=fr;
      } else {
        time=1;
      }
    } else {
      if (fl % 8 < i) {
        time = 1;
      } else if (fl % 8 == i) {
        time = 1-fr;
      } else {
        time = 0;
      }
    }
    boxes[i].move(time);
    boxes[i].display();
  }
}

class Box {
  constructor(x, y, z, s){
    this.p = createVector(x, y, z);
    this.s = s;
    this.sp = this.p.copy();
    this.tp = createVector(random(-s * 2, s * 2), random(-s * 2, s * 2), random(-s * 2, s * 2));
  }

  move(t){
    this.p.x = map(Easing.easeInOutExpo(t), 0, 1, this.sp.x, this.tp.x);
    this.p.y = map(Easing.easeInOutExpo(t), 0, 1, this.sp.y, this.tp.y);
    this.p.z = map(Easing.easeInOutExpo(t), 0, 1, this.sp.z, this.tp.z);
  }

  display(){
    push();
    translate(this.p.x, this.p.y, this.p.z);
    box(this.s);
    pop();
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