// import { autoFillPopUp } from "app/popup.js";
import { autoFillPopUp } from "./popup.js";
import { countdown, displayTime } from "./timer.js";
// get the location of the clues in the HTML document
const category1 = document.querySelectorAll(".cat1");
const category2 = document.querySelectorAll(".cat2");
const category3 = document.querySelectorAll(".cat3");
const category4 = document.querySelectorAll(".cat4");
const category5 = document.querySelectorAll(".cat5");
const category6 = document.querySelectorAll(".cat6");


const preview = document.querySelector(".preview");
const startButton = document.querySelector(".preview__start");
const timer = document.querySelector(".footer__timer");
const score = document.querySelector(".footer__score .scoreNum");
var gameScore = 0;

const endScreen = document.querySelector(".end");
const endScore = document.querySelector(".end__score .scoreNum");
const restartButton = document.querySelector(".end__restart");


// store the locations in an array
const categories = [category1, category2, category3, category4, category5, category6];
var clues;
var clickedClues;
// store the URL for the API
const jeopardyAPI = "https://jservice.io/api/clues?category=";

class Clues {
    constructor() {
        this.clue = [];
        this.randNum = 0;
        // this.randNum = 224;
    }

    getClues(){
        this.randNum = Math.floor(Math.random() * 1500);
        var self = this;
        fetch(jeopardyAPI + this.randNum)
            .then(response => response.json())
            .then(json => {
                // Check if the category has enough clues
                if (json.length >= 5) {
                    // console.log("Valid");

                    // If the array is not empty, erase the previous clues
                    if (self.clue.length > 0) {
                        self.clue = [];
                    }
                    self.clue.push(json[0].category.title);
                    for (var i = 0; i < 5; i++) {
                        let clueVal = json[i].value;
                        let clueQuest = json[i].question;
                        let clueAns = json[i].answer;
                        self.clue.push({clueVal, clueQuest, clueAns});
                    }
                }
                // If the category does not have enough clues, request a new category and run the function again
                else {
                    // console.log("Not Valid");
                    // self.randNum = Math.floor(Math.random() * 1000);
                    self.getClues();
                }
            })
            .catch(err => console.error(err));
    }
}

// Function to check if a clue has an empty question or answer
const hasEmptyField = clue => {
    var results = [];

    // Go through all the clues
    for (var i = 1; i < clue.length; i++) {
        // Check if a clue has an empty question
        if(clue[i].clueQuest == ""){
            // console.log(`Clue ${i} an empty Question.`);
            results.push(1);
        }
        // Check if a clue has an empty answer
        else if(clue[i].clueAns == "") {
            // console.log(`Clue ${i} an empty Answer.`);
            results.push(1);
        }
        else {
            // console.log(`"Clue ${i} clear for TakeOff! :)"`);
            results.push(0);
        }
    }
    return results;
}


// Generate clues for all categories
const generateClues = () => {

    clues = [];
    
    for (var i = 0; i < categories.length; i++) {
        clues[i] = new Clues();
    }
    
    for (let clue of clues) {
        clue.getClues();
        setTimeout(() => {
            // Check each clue for an empty field
            var result = hasEmptyField(clue.clue);
            if (result.includes(1)) {
                // console.log("Has an Empty Field. Generating new clues");
                clue.getClues();
            }
            // else {
                // console.log("All fields clear!");
                // }
                // console.log(clue.clue);
                
        }, 1000);
        
    }
        
    // Check if there is a missing Clue Value Field
    setTimeout(() => {
        // console.log("Working");
        // var emptyVals = [];
        for (let clue of clues) {
            // Check if all clues have Clue Values
            for (let i = 1; i < clue.clue.length; i++) {
                // console.log("Working");
                // Check for empty space
                if (clue.clue[i].clueVal == null) {
                    // let val = i * 100;
                    console.log("There is a missing value!");
                    // populate it with the proper value
                    console.log(i * 100);
                    clue.clue[i].clueVal = `${(i * 100)}`;
                }
            }
        }
        // return true;
    }, 3000);
}
        
const startTimer = (timeLength = 5) => {

    var time = new Date();
    time.setMinutes(timeLength);
    time.setSeconds(0);

    /* console.log(time.getMinutes(), time.getSeconds()); */
    // displayTime(time);
    // timer.innerHTML = `${time.getMinutes()}:${time.getSeconds()}0`;
    
    timer.innerHTML = displayTime(time);
    let q1 = setInterval(() => {
        // first == false ? clearInterval(q1) : console.log("First Time WOOO!!!");
        countdown(time);
    //   displayTime(time);
        timer.innerHTML = displayTime(time);
    //   timer.innerHTML = `${time.getMinutes()}:${time.getSeconds()}`;
    //console.log(time.getMinutes(), time.getSeconds());
        if ((time.getMinutes() == 0 && time.getSeconds() == 0) || (clickedClues.length == 30)){
            clickedClues = "";
            console.log("End it");
            clearInterval(q1);
        // End game function
            gameOver();

        }
    }, 1000);
  
    // console.log(date);
    // console.log(time);
}


// Display the category names
function displayGameBoard(){

    score.innerHTML = gameScore;

    setTimeout(() => {
        // Populate the squares with clue values
        for (var i = 0; i < categories.length; i++) {
            categories[i][0].innerHTML = `${clues[i].clue[0]}`
            for (var j = 1; j < categories[i].length; j++) {
                categories[i][j].innerHTML = `${clues[i].clue[j].clueVal}`;
            }
        }
        
        console.log(clues);
        
        
        // Popup Clue
        // When a clue is clicked...
        $(".clue").on("click", function(e){
            e.preventDefault();
            // console.log(e);
            // console.log(e.target.className);
            
            //Get the category and position for the clue 
            let names = e.target.className.split(" ");
            let cat = names[1].substr(-1) - 1;
            let pos = names[2].substr(-1);
            
            // console.log(names);
            console.log(cat, pos);
            //console.log("Working");
            console.log(clues[cat].clue[pos].clueQuest);
            // Call the popup module with the clicked clue's question
            let currentClue = autoFillPopUp(clues[cat].clue[pos].clueQuest);
            console.log(currentClue);
            
            // Remove the clue from the board
            e.target.classList.add("clicked");
            
            // Add the popup questino to the screen and check the submitted answer when the input field is submitted
            currentClue.appendTo(document.body)
            .on("submit", function(e){
                e.preventDefault();
                console.log("submitted. checking!");
                
                //   console.log(e.target.className);
                let $submittedAns = $(".ans").val().toLowerCase();
                let answer = clues[cat].clue[pos].clueAns.toLowerCase();
                // let response = `c${$submittedAns}`;
                // answer.toLowerCase();
                // console.log(answer);
                
                let incorrectAns = "var(--red)";
                let correctAns = "var(--very-dark-blue)";
                
                // Check if the user's answer is correct
                if($submittedAns == answer){
                    console.log("correct");
                    // Add to score the value of the clue
                    gameScore += clues[cat].clue[pos].clueVal;
                    
                    // Display the correct answer
                    $("<div>")
                    .text(`Correct: ${answer}`)
                    .addClass("ans")
                    .appendTo(e.target);
                }
                else{
                    console.log("incorrect");
                    console.log(answer);
                    // Subtract from score the value of the clue
                    gameScore -= clues[cat].clue[pos].clueVal;
                    
                    // Display the correct answer
                    $("<div>")
                    .text(`Correct Answer: ${answer}`)
                    .css("color", `${incorrectAns}`)
                    .addClass("ans")
                    .appendTo(e.target);
                    
                    // Display the user's answer
                    $("<div>")
                    .text(`Your Answer: ${$submittedAns}`)
                    .css("color", `${incorrectAns}`)
                    .addClass("ans")
                    .appendTo(e.target);
                }
                
                // Update the score display
                score.innerHTML = gameScore;
                // Check if score is negative
                gameScore < 0 ? score.style.color = incorrectAns : score.style.color = correctAns;
                
                // Remove the question pop up from the screen
                setTimeout(()=> {
                    $(e.target).
                    parent().
                    remove();
                    clickedClues = document.querySelectorAll(".clicked");
                    clickedClues.length == 30 ? gameOver() : console.log(clickedClues);
                }, 2000);
                
            });
            
            
        });
    }, 500);
}
    
// Start Game Funciton 
// Generates Clues
// Populates board
// Displays Board
// Starts Timer
function startGame(){
    console.log("GAME START!!!");
    endScreen.style.opacity = "0";
    endScreen.style.visibility = "hidden";
    endScreen.style.display = "none";
    // Generate the clues
    generateClues();
    // After the clues are generated, populate the game board
    setTimeout(() => {
        displayGameBoard();
        // Start the timer for 10 minutes
        startTimer(10);
    }, 5000)
    // generateClues() ? displayGameBoard() : setTimeout(displayGameBoard(), 1000);
    
    // Fade out the preview screen
    preview.style.opacity = "0";
    preview.style.visibility = "hidden";
    
    setTimeout(() => {
        // Fade in each column
        let delay = 0;
        for(let i = 0; i < categories.length; i++){
            for(let j = 0; j < categories[i].length; j++){
                categories[i][j].style.animationName = "fadeInClues";
                categories[i][j].style.animationDelay = `${delay}s`;
            }
            delay += 0.25;
        }
    }, 1500);
}

const resetBoard = () => {
    // Show all clicked clues
    // Remove all inner values
    for(let i = 0; i < categories.length; i++){
        for(let j = 0; j < categories[i].length; j++){
            categories[i][j].classList.remove("clicked");
            categories[i][j].innerHTML = "";
            categories[i][j].style.animationName = "";
        }
    }

    // Remove any open question from the screen
    var openQuestion = document.querySelector(".question");
    if(openQuestion){
        openQuestion.remove();
    }


}

function gameOver(){
    // Fade in the end screen
    endScreen.style.opacity = "1";
    endScreen.style.visibility = "visible";
    endScreen.style.display = "flex";

    // Display the final score
    endScore.innerHTML = gameScore;
    gameScore < 0 ? endScore.style.color = "var(--red)" : endScore.style.color = "var(--main-blue)";

    resetBoard();

    // reset the score to zero
    gameScore = 0;
    score.style.color = "var(--very-dark-blue)";
    // timer.innerHTML = "";
    // startTimer(false);
    // startTimer(false);
    timer.innerHTML = "";
    timer.style.color = "var(--main-blue)";
}


startButton.onclick = startGame;
restartButton.onclick = startGame;