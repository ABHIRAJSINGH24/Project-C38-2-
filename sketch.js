//Create variables here
var dog,happyDog;
var dogImage,happyDogImage;

var database;

var foodS, foodStock;

function preload()
{
	//load images here
  dogImage = loadImage('images/Dog.png');
  happyDogImage = loadImage('images/happydog.png');
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,200,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;
}


function draw() {  
  background(46, 139, 87);
  
  if(keyCode===UP_ARROW){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  //add styles here
  textSize(25);
  fill("blue");
  stroke("blue");
  text("Press UP arrow to feed the dog milk",60,50)
  text("Food Remaining:"+foodS,140,100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else {
    x = x-1
  }
  database.ref('/').update({
    Food:x
  })
}