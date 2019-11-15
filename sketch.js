var timeKeeper = 0;
var wanderers = [];
let noiseScale = 1000;//bigger the scale the larger the over all curves 
let noiseStrength = 18; //bigger the strength the more divergent the lines are from each other

let klimFont;

let canGenerate = false;

let img; 


var crawlx = 0;
var crawly = 0;
function preload(){
  klimFont  = loadFont('Geograph-Bold.otf');
  img = loadImage('geograph.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  if (timeKeeper < 1){
    console.log("hello?");
    var wantTransparent = true;
    // image(img, 0,0, width, height);
    textFont(klimFont);
    textSize(280);
    fill(0,20);
    stroke(255);
    textAlign(CENTER, CENTER);
    text("GEO", width/2, height/3);
    text("GRAPH", width/2, 2 * height/3);
    for(let y = height/5; y < height; y+=10){
      for(let x = 0; x < width; x +=1){
        var rgba = get(x, y);
        console.log("rgba = "+ rgba);
        if(rgba[0] > 0){
          let something = new Wanderer(x, y);
          wanderers.push(something);
          console.log("made a particle");
        }
      }
    }
    for(let x = width/5; x < width; x+=10){
      for(let y = height/5; y < height*0.9; y +=1){
        var rgba = get(x, y);
        console.log("rgba = "+ rgba);
        if(rgba[0] > 0){
          let something = new Wanderer(x, y);
          wanderers.push(something);
          console.log("made a particle");
        }
      }
    }
  }
  background(0);
}

function draw() {

  // if (timeKeeper < 1){
  //   console.log("hello?");
  //   var wantTransparent = true;
  //   // image(img, 0,0, width, height);
  //   textFont(klimFont);
  //   textSize(350);
  //   fill(0,20);
  //   stroke(255);
  //   textAlign(CENTER, CENTER);
  //   text("GEO", width/2, height/3);
  //   text("GRAPH", width/2, 2*height/3);
  //   for(let y = height/5; y <height; y+=10){
  //     for(let x = 0; x < width; x +=1){
  //       var rgba = get(x, y);
  //       console.log("rgba = "+ rgba);
  //       if(rgba[0] > 0){
  //         let something = new Wanderer(x, y);
  //         wanderers.push(something);
  //         console.log("made a particle");
  //       }
  //     }
  //   }
  // }
  if (timeKeeper < 600){
    timeKeeper +=1;
    // background(0,1);
    textFont(klimFont);
    textSize(280);
    fill(0,1);
    noStroke();
    textAlign(CENTER, CENTER);
    text("GEO", width/2, height/3);
    text("GRAPH", width/2, 2 * height/3);
    for(let i = 0; i < wanderers.length; i++){
      wanderers[i].move();
      wanderers[i].display();
    }
  }
}
function mouseMoved(){
  if(canGenerate){
      let something = new Wanderer(mouseX, mouseY);
  // noiseScale = map(mouseX, 0,400, 20,500);
  // noiseStrength = map(mouseY, 0, 400,20,100);
    wanderers.push(something);
  }

  
}
function keyPressed(){
  canGenerate = !canGenerate;
}

class Wanderer{
  constructor(x, y){
    this.originX = x;
    this.originY = y;
    this.prevX = this.originX;
    this.prevY = this.originY;
    this.currentX = this.originX;
    this.currentY = this.originY;
    this.angle = 0;
    this.deltaAngle = 0;
    
    this.stepSize = 4;
  }
  move(){
    var newAngle = noise(this.currentX / noiseScale, this.currentY / noiseScale)* noiseStrength;
    // this.deltaAngle = this.angle - newAngle;
    this.angle = newAngle;
    this.prevX = this.currentX;
    this.prevY = this.currentY;
    
    this.currentX += cos(this.angle) * this.stepSize;
    this.currentY += sin(this.angle) * this.stepSize;
    
    // this.stepSize = log(timeKeeper);
    
  }
  display(){
    push();
    // let sColor = map(this.angle, 0, 3, 255, 0);
    // let sColor = constrain(255-(timeKeeper*timeKeeper)/10, 20, 255);
    // let sColor = (1000/(timeKeeper+1)) * 2 + map(abs(this.deltaAngle), 0, 0.2, 5,200);
    let sColor = (1000/(timeKeeper+1)) * 2;
    stroke(255, sColor);
    strokeWeight(1);
    line(this.prevX, this.prevY, this.currentX, this.currentY);
    pop();
  }
}