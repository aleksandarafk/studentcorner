const focusmodebtn = document.querySelector('#checkbox');
const kebab = document.querySelector('.fa-ellipsis-vertical');
const timerRef = document.querySelector('.timer-nums');
const soundBtn = document.querySelector('.soundBtn');
const sound = document.querySelector('#music-audio');
console.log(sound)

let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
timerRef.innerHTML = '00 : 00 : 00 ';
let int = null;

//change the focusmode state boolean with clicking on the toggle
focusmodebtn.addEventListener('click', ()=>{
    let focusModeChecked = focusmodebtn.checked;
    
    localStorage.setItem("focusModeOn", focusModeChecked);
    console.log('focusmode is set to '+  focusModeChecked)
    if(focusModeChecked){
        if(int!==null){
            clearInterval(int);
        }
        int = setInterval(displayTimer,10);

    }else{
        clearInterval(int);
        [milliseconds,seconds,minutes,hours] = [0,0,0,0];
        timerRef.innerHTML = '00 : 00 : 00 ';

    }
})

// Get the saved state of the checkbox from localstorage
let focusModeState = localStorage.getItem("focusModeOn")
console.log('focusmode is taken as '+  focusModeState)

//get the state of the toggle before the loading of the page (used mainly for switching between index.js and the tools)
window.addEventListener('load', ()=>{
    if (focusModeState !== null){
        if(focusModeState === 'true'){
            focusmodebtn.checked = true;
           
        }else{
            focusmodebtn.checked = false;
           
        }
    }
})

  //creates the timer itself
function displayTimer() {
    milliseconds += 10;

    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;

            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    //updates the timer
    timerRef.innerHTML = ` ${h} : ${m} : ${s} `;
} 

const soundTitle = document.querySelector(".soundTitle");
soundBtn.addEventListener('click', () =>{
    console.log('sound click')
    if(soundBtn.classList.contains('fa-volume-mute')){
        soundBtn.classList.replace("fa-volume-mute", "fa-volume-high");
        sound.play();
        soundTitle.innerHTML= "Stop Concentration Music?";
    }else{
        soundBtn.classList.replace("fa-volume-high", "fa-volume-mute");
        sound.pause();
        soundTitle.innerHTML= "Play Concentration Music?"
    }

})