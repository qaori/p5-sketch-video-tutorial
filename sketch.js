// https://www.youtube.com/watch?v=vOYVXPNs-9g

let isRecording = false;
let points;
let bounds;
let txt = "NEW LOGO!";
let textSize = 100;
const COL = createCols("https://coolors.co/ff6666-ccff66-5d2e8c-2ec4b6-f1e8b8");
// const COL = createCols("https://coolors.co/f08080-f4978e-f8ad9d-fbc4ab-ffdab9");


// 事前読み込み処理:外部ファイルは基本ここでロードする．
function preload() {
  // setupより先に実行
  font = loadFont("Lemonada-Regular.ttf");
}

function setup() {

  //文字の輪郭線上の点を抽出
  points = font.textToPoints(txt, 0, 0, textSize, {
    sampleFactor: 0.08, // 点の間隔
    simplifyThreshold: 0 //輪郭の単純化
  });
  //文字を表示するときの輪郭をXY座標，幅，高さの情報として取得
  bounds = font.textBounds(txt, 0, 0, textSize);
  print(bounds);

  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  textFont(font); // 読み込んだフォントを文字に割当てる

}

function draw() {
  background('#fafefd');
  drawingContext.shadowColor = color(COL[int(random(COL.length))]);
  drawingContext.shadowBlur = 30;

  push();
  translate(width * 0.32, height * 0.55);

  // rect(-bounds.w / 2, -bounds.h / 2, bounds.w, bounds.h);
  //大きさに合わせて描画の基準位置に原点を
  translate(-bounds.x - bounds.w * 0.3, -bounds.y - bounds.h * 0.7);

  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    fill(COL[int(random(COL.length))]);
    strokeWeight(0.3);
    circle(x, y, (i + frameCount) % 30);
  }
  pop();
}

function mousePressed() {
  if (isRecording == true) {
    stopRecording();
  } else {
    startRecording();
  }
  isRecording = !isRecording;
}


function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}