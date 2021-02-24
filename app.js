const pTimer = document.querySelector(".timer");

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const pauseBtn = document.querySelector('.pause');

// const input = document.querySelector('#input'); 

// set up the initail values for the timer in seconds 
let workDuration = 1500; 
let currentTimeleft = 1500; 
let initialBreak = 300;  


let clockOn = false; 
let clockoff = true; 

// calulate the value for the time in minutes and then make it the default value that is shown in the html, so there is something there
initialTime = (currentTimeleft / 60) % 60; 
pTimer.innerHTML = String(`${initialTime}:00`); 


if (length(input.value != 0)) { 
    currentTimeleft = parseInt(input.value); 
}

startBtn.addEventListener('click', () => {
    timer(); 
    console.log(currentTimeleft)
})

pauseBtn.addEventListener('click', () => { 
    timer(); 
})

stopBtn.addEventListener('click', () => { 
    timer(true); 
})

// initial func to make the timer work
const timer = condition => { 
    if (condition) { 
        stopClock(); 
    }else { 
        if (clockOn === true) { 
            clockOn = false;
            clearInterval(clockTimer); 
        }else {
            clockOn = true; 
            clockTimer = setInterval (() => { 
                currentTimeleft--; 
                displayUpdatedTime(); 
            }, 1000)
        }
    }
}


// show calculate the time and update the displayo to show it 
const displayUpdatedTime = () => { 
    const secsLeft = currentTimeleft; 
    let time = ''; 
    const secs = secsLeft % 60; 
    const mins = parseInt(secsLeft / 60) % 60; 
    const hours = parseInt(secsLeft / 3600); 

    const leadingZeroes = time => { 
        return time < 10 ? `0${time}` : time 
    }

    if (hours > 0) time += `${hours}:`
    time += `${leadingZeroes(mins)}:${leadingZeroes(secs)}`
    pTimer.innerHTML = time.toString(); 

}

const stopClock = () => { 
    // reset everthign to the original state and stop the timer 
    clearInterval(clockTimer); 
    
    clockoff = true; 
    clockOn = false; 
    
    currentTimeleft = workDuration; 
    displayUpdatedTime(); 
}