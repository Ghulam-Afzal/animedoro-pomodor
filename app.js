const pTimer = document.querySelector(".timer");

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const pauseBtn = document.querySelector('.pause');
const header = document.querySelector('.header'); 
const animeBtn = document.querySelector('.Animedoro'); 
const pomoBtn = document.querySelector('.Pomodoro');

const workInput = document.querySelector('#work-time'); 
const breakInput = document.querySelector('#break-time');

workInput.value = '25'
breakInput.value = '5'
// set up the initail values for the timer in seconds 
let workDuration = 1500; 
let currentTimeleft = 1500; 
let initialBreak = 300;  

let pType = 'Pomodoro'; 
let pomodorosCompleted = 3; 

let clockOn = false; 
let clockoff = true; 

// calulate the value for the time in minutes and then make it the default value that is shown in the html, so there is something there
initialTime = (currentTimeleft / 60) % 60; 
pTimer.innerHTML = String(`${initialTime}:00`);


startBtn.addEventListener('click', () => {
    timer(); 
})

pauseBtn.addEventListener('click', () => { 
    timer(); 
})

stopBtn.addEventListener('click', () => { 
    timer(true); 
})

animeBtn.addEventListener('click', () => { 
    pType = "Animedoro"; 
    header.innerHTML = "Animedoro Timer"; 
    workDuration = 3540; 
    currentTimeleft = workDuration; 
    initialBreak = 1200;
    workInput.value = workDuration / 60; 
    breakInput.value = initialBreak / 60;
    updateInitialTime();  
})

pomoBtn.addEventListener('click', () => { 
    pType = 'Pomodoro';
    header.innerHTML = "Pomodoro Timer"; 
    workDuration = 1500; 
    currentTimeleft = workDuration; 
    initialBreak = 300;
    workInput.value = workDuration / 60; 
    breakInput.value = initialBreak / 60;
    updateInitialTime();  
})

workInput.addEventListener('input', () => {
    let updateWorkTimer = minsToSecs(workInput.value)
    currentTimeleft = updateWorkTimer ?  updateWorkTimer : workDuration
    workDuration = currentTimeleft; 
    updateInitialTime(workDuration); 

})

breakInput.addEventListener('input', () => {
    let updateBreakTimer = minsToSecs(breakInput.value)
    currentTimeleft = updateBreakTimer ?  updateBreakTimer : initialBreak
    initialBreak = currentTimeleft; 
    updateInitialTime(initialBreak); 

})

const minsToSecs = mins => {
    return mins * 60; 
}

const updateInitialTime = (time) => { 
    initialTime = (workDuration / 60) % 60; 
    pTimer.innerHTML = String(`${initialTime}:00`);
}

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
                countDown(); 
                displayUpdatedTime(); 
            }, 1000)
        }
    }
}

const countDown = () => {
    if (currentTimeleft > 0) { 
        currentTimeleft--; 
    }if(currentTimeleft == 0) { 
       if (pomodorosCompleted != 4) { 
        if (pType === 'Animedoro') { 
            pomodorosCompleted += 1; 
            workDuration = initialBreak;
            currentTimeleft = workDuration;
            updateInitialTime(); 
            timer(true); 
        }else { 
            pomodorosCompleted += 1;
            workDuration = initialBreak;
            currentTimeleft = workDuration ;          
            updateInitialTime(); 
            timer(true); 
        }
       }else if (pomodorosCompleted === 4) {
           if (pType === "Animedoro") { 
               initialBreak = initialBreak * 2 
               currentTimeleft = initialBreak;
               updateInitialTime(); 
               timer(true); 
           }else { 
            initialBreak = initialBreak * 4
            currentTimeleft = initialBreak;
            updateInitialTime(); 
            timer(true); 
           }
       }

    }
}
console.log(pomodorosCompleted); 

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
    
    if (pType === 'Animedoro') { 
        currentTimeleft = 3540;
    }else if(pType ==='Pomodoro'){ 
        currentTimeleft = workDuration;
    }    
    displayUpdatedTime(); 
}