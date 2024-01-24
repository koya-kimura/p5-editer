const s = 100;
let t = 0;
let cp;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cp = random(colorPalletes).colors;
}

function draw() {
  background(255);

  // angle : 0.732
  const angle = 0.732 + Easing.easeInOutExpo(fract(t))*TAU;
  const h = 243;
  const r = 2678;
  camera(r*sin(angle), h, r*cos(angle), 0, 0, 0, 0, -1, 0);

  push();
  translate(-s * 2, -s*2, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(-s * 2, -s, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(-s * 2, 0, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(-s * 2, s, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(-s * 2, s*2, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(-s * 1, -s * 2, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(0, -s * 2, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, -s * 2, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, -s * 1, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, 0, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, s, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, s * 2, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, s * 3, 0);
  drawBox(s, cp);
  pop();

  push();
  translate(s, s * 3, s);
  drawBox(s, cp);
  pop();

  push();
  translate(s, s * 3, s * 2);
  drawBox(s, cp);
  pop();

  push();
  translate(s, s * 3, s * 3);
  drawBox(s, cp);
  pop();

  t += 0.005;
}

function drawBox(size, faceColors) {
  // 各面の色を設定
  fill(faceColors[0%faceColors.length]); // 底面
  beginShape();
  vertex(-size / 2, -size / 2, 0);
  vertex(size / 2, -size / 2, 0);
  vertex(size / 2, size / 2, 0);
  vertex(-size / 2, size / 2, 0);
  endShape(CLOSE);

  fill(faceColors[1%faceColors.length]); // 上面
  beginShape();
  vertex(-size / 2, -size / 2, size);
  vertex(size / 2, -size / 2, size);
  vertex(size / 2, size / 2, size);
  vertex(-size / 2, size / 2, size);
  endShape(CLOSE);

  fill(faceColors[2%faceColors.length]); // 側面1
  beginShape();
  vertex(-size / 2, -size / 2, 0);
  vertex(-size / 2, -size / 2, size);
  vertex(-size / 2, size / 2, size);
  vertex(-size / 2, size / 2, 0);
  endShape(CLOSE);

  fill(faceColors[3%faceColors.length]); // 側面2
  beginShape();
  vertex(size / 2, -size / 2, 0);
  vertex(size / 2, -size / 2, size);
  vertex(size / 2, size / 2, size);
  vertex(size / 2, size / 2, 0);
  endShape(CLOSE);

  fill(faceColors[4%faceColors.length]); // 側面3
  beginShape();
  vertex(-size / 2, -size / 2, 0);
  vertex(-size / 2, -size / 2, size);
  vertex(size / 2, -size / 2, size);
  vertex(size / 2, -size / 2, 0);
  endShape(CLOSE);

  fill(faceColors[5%faceColors.length]); // 側面4
  beginShape();
  vertex(-size / 2, size / 2, 0);
  vertex(-size / 2, size / 2, size);
  vertex(size / 2, size / 2, size);
  vertex(size / 2, size / 2, 0);
  endShape(CLOSE);
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