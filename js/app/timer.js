//Js Timer Function
//Decrease the time by one second per iteration
const countdown = time => {
	//Get the minutes and seconds value
  let mins = time.getMinutes();
  let secs = time.getSeconds();

  // Check if a minute has passed
  if(secs == 0){
  	//If a minute has passed, decrease the minute value by 1 and reset the seconds to 59
    mins--;
    secs = 59;
    //Set the times values to secs and mins
    time.setSeconds(secs);
    time.setMinutes(mins);
  }

  // Check if a second has passed
  else if (secs > 0) {
     secs--;
     time.setSeconds(secs);
  }
}

//Display the time
const displayTime = time => {
    if(time.getSeconds() < 10){
    	// console.log(`${time.getMinutes()}:0${time.getSeconds()}`);
      return `${time.getMinutes()}:0${time.getSeconds()}`;
    }
    else{
    	// console.log(`${time.getMinutes()}:${time.getSeconds()}`);
      return `${time.getMinutes()}:${time.getSeconds()}`;
    }
}

//Function to start the 15 minute timer
const startTimer = time => {

  /* console.log(time.getMinutes(), time.getSeconds()); */
  displayTime(time);
  let q1 = setInterval(() => {
    countdown(time);
    displayTime(time);
    //console.log(time.getMinutes(), time.getSeconds());
    if (time.getMinutes() == 0 && time.getSeconds() == 0){
      console.log("End it");
      clearInterval(q1);
    }
  }, 1000);

  // console.log(date);
  // console.log(time);
}


// startTimer();

export { countdown, displayTime };
