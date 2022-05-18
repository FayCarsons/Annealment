var canvasSize = 600
var part = 3000
var noiseScale = 5
var opacityFactor = 10
var speed = 0

var xCoor = []
var yCoor = []
var diam = []
var colon = []
var ope = []
var time = 0

function setup() {
  var noiseScale = 5*random(0,4)
  var colorChoice = random(0,225)
  speed = 0.0025*int(random(1,5))
  strokeWeight(10)
  createCanvas(canvasSize, canvasSize);
  for ( let i = 0; i < part; i++){
    xCoor.push(random());
    yCoor.push(random());
    diam.push(canvasSize/150+random()*canvasSize/200);
    colon.push(colorChoice+random()*35);
    ope.push(0)
  }
}

function flow() {
  time += 0.0075
  
  for (let i = 0; i < part; i++){
    
    let x = xCoor[i]
    let y = yCoor[i]

    let deltaX = sin(noise(cos(x)*noiseScale,sin(y)*noiseScale,sin(time*0.1)*5)*TWO_PI*2)
    let deltaY = cos(noise(-cos(x)*noiseScale,-sin(y)*noiseScale,sin(time*0.1)*5)*TWO_PI*2)

    xCoor[i] = x + deltaX*speed
    yCoor[i] = y + deltaY*speed

  }

}

function draw() {
  fill(0,0,0,20)
  rect(0,0,canvasSize,canvasSize)
  
  for (let i = 0; i < part; i++){
    ope[i] += opacityFactor
    colorMode(HSB,255)
    fill(colon[i],64+sin(random(0,PI)*16),random(96,127)+sin(ope[i])*16,ope[i]);
    circle(xCoor[i]*canvasSize,yCoor[i]*canvasSize,diam[i]);
    if (xCoor[i] > 1 || yCoor[i] > 1 || xCoor[i] < 0 || yCoor[i] < 0 || random()<0.005){
      xCoor[i] = random(); 
      yCoor[i] = random();
      ope[i] = 0
    }
  }
  flow();
}


