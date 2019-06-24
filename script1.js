let video;
let poseNet;
let poses = [];
let trails = [];
let a = 0;
let naso;
let orecchioSx;
let orecchioDx;
let bocca;
let occhioDx;
let occhioSx;

let noseX = 0;
let noseY = 0;
let ear1X = 0;
let ear1Y = 0;
let ear2X = 0;
let ear2Y = 0;

let eye1X = 0;
let eye1Y = 0;

let eye2X = 0;
let eye2Y = 0;

let mouthX = 0;
let mouthY = 0;

function preload() {
    bocca = loadImage('images/faccia_01/bocca_1.png');
    naso = loadImage('images/faccia_01/naso_1.png');
    orecchioSx = loadImage('images/faccia_01/orecchioSx_1.png');
    orecchioDx = loadImage('images/faccia_01/orecchioDx_1.png');
    occhio = loadImage('images/faccia_01/occhio_1.png');

}


function modelReady() {

  console.log("Model Is Ready!!!")

}



function setup() {

  createCanvas(640*2, 480*2);
  angleMode(RADIANS);
  imageMode(CENTER);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });


}

function draw() {
  background(30);
  image(video, width/2, height/2, width, height);

  let d = dist(noseX, noseY, eye1X, eye1Y);


  drawKeypoints(d);


}


function drawKeypoints(d) {
  this.leftEye = new Eye();
  this.rightEye = new Eye();
  this.nose = new Nose();
  this.leftEar = new leftEarFunction();
  this.rightEar = new rightEarFunction();
  this.mouth = new Mouth();

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {

    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;

    let newear1X = poses[0].pose.keypoints[4].position.x;
    let newear1Y = poses[0].pose.keypoints[4].position.y;

    let newear2X = poses[0].pose.keypoints[3].position.x;
    let newear2Y = poses[0].pose.keypoints[3].position.y;

    let newEye1X = poses[0].pose.keypoints[1].position.x;
    let newEye1Y = poses[0].pose.keypoints[1].position.y;

    let newEye2X = poses[0].pose.keypoints[2].position.x;
    let newEye2Y = poses[0].pose.keypoints[2].position.y;

    let newmouthX = poses[0].pose.keypoints[0].position.x;
    let newmouthY = poses[0].pose.keypoints[0].position.y;

    noseX = lerp(noseX, newX, 0.2);
    noseY = lerp(noseY, newY, 0.2);

    ear1X = lerp(ear1X, newear1X, 0.1);
    ear1Y = lerp(ear1Y, newear1Y, 0.1);

    ear2X = lerp(ear2X, newear2X, 0.2);
    ear2Y = lerp(ear2Y, newear2Y, 0.2);

    eye1X = lerp(eye1X, newEye1X, 0.2);
    eye1Y = lerp(eye1Y, newEye1Y, 0.2);

    eye2X = lerp(eye2X, newEye2X, 0.2);
    eye2Y = lerp(eye2Y, newEye2Y, 0.2);

    mouthX = lerp(mouthX, newmouthX, 0.2);
    mouthY = lerp(mouthY, newmouthY, 0.2);


    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];

      if (poses[0].pose.keypoints[0].score > 0.2) {
        this.leftEye.display(poses[0].pose.keypoints[1].position.x, poses[0].pose.keypoints[1].position.y, d);
        this.rightEye.display(poses[0].pose.keypoints[2].position.x, poses[0].pose.keypoints[2].position.y, d);
        this.nose.display(poses[0].pose.keypoints[0].position.x, poses[0].pose.keypoints[0].position.y - 30, d);
        this.mouth.display(poses[0].pose.keypoints[0].position.x, poses[0].pose.keypoints[0].position.y + 60, d);
        this.leftEar.display(poses[0].pose.keypoints[3].position.x, poses[0].pose.keypoints[3].position.y, d);
        this.rightEar.display(poses[0].pose.keypoints[4].position.x, poses[0].pose.keypoints[4].position.y, d);
      }
    }
  }
}

function Eye(d) {

  this.display = function(x, y, d) {
    smooth();

    fill(255);
    image(occhio,  eye1X, eye1Y,  d*1.3, (d+20)*1.1)
    image(occhio, eye2X, eye2Y , d*1.3, (d+20)*1.1)
    noStroke();
    fill(55,0,169);
    ellipse(eye1X, eye1Y, d*0.4);
    ellipse(eye2X, eye2Y, d*0.4);
    fill(255,186,0);
    ellipse(eye1X, eye1Y, d*0.2);
    ellipse(eye2X, eye2Y, d*0.2);



  }
}

function Nose(d) {

  this.display = function(x, y, d) {
    fill(255, 200, 0);
    smooth();

    image(naso, noseX, noseY, d * 0.9, d * 1.2);
  }
}

function rightEarFunction(d) {

  this.display = function(x, y, d) {
    smooth();

    image(orecchioSx, ear1X-(d*0.5), ear1Y, d * 1 , d * 1.4);

  }
}

function leftEarFunction(d) {

  this.display = function(x, y, d) {
    smooth();

    image(orecchioDx, ear2X+(d*0.5), ear2Y, d * 1 , d*1.4);

  }
}

function Mouth(d) {
  this.display = function(x, y, d) {
    smooth();

    image(bocca, mouthX, mouthY+( d), d*1.7, d *0.7);
  }
}
