const gameContainer = document.getElementById("game");
//const startBtn = document.querySelector("#start");
//const restartBtn = document.querySelector("#restart");
let count = 0;
let preColor = null;
let lockBoard = false;
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(lockBoard) return;
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  console.log("count", count);
 
  //change 
  if(count==0){ //start new pair
      event.target.style.backgroundColor = event.target.className; // flip card
      preColor = event.target.className;
      count++
  }
  else if(count==1){ //
      console.log(event.target.style.backgroundColor);
      if(event.target.style.backgroundColor != event.target.className){//card has not flipped yet
        event.target.style.backgroundColor = event.target.className; //flip card
        //different color with preColor, flip both card back
        if(event.target.className != preColor){
          const preDivs = document.querySelectorAll("." + preColor);
          lockBoard = true; //  set flag to wait
          for(let div of preDivs){
            if(div.style.backgroundColor==preColor)
              setTimeout(function(){flipCardBack(div)}, 1000);
          }
          setTimeout(function(){flipCardBack(event.target)}, 1000);
        }else{ // card match
          score++;
        }
        count=0;
      }     
  }
}

// flip card back
function flipCardBack(elem){
  elem.style.backgroundColor = null;
  console.log("flipped");
  lockBoard = false; // unset flag
}

//startBtn.addEventListener("click", handleStart());
//restartBtn.addEventListener("click", handleRestart());

function handleStart(){
}

function handleRestart(){
}

// when the DOM loads
createDivsForColors(shuffledColors);



/* */