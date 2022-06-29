//Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer")

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');;
const fullScreenButton = player.querySelector('.full')
//Function

function togglePlay(){

    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function HandleRangeUpdate(){
    video[this.name] = this.value;
}

function HandleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function togglefullscreen(){
    video.requestFullscreen();
}
//Hook up with eventlistener
video.addEventListener("click" , togglePlay);
video.addEventListener("play" , updateButton);
video.addEventListener("pause" , updateButton);
video.addEventListener("timeupdate" , HandleProgress);
toggle.addEventListener("click" , togglePlay);
ranges.forEach(range => range.addEventListener("change" , HandleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove" , HandleRangeUpdate));
skipButtons.forEach(skipButton => skipButton.addEventListener("click",skip));
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => {mousedown = true});
progress.addEventListener("mouseup", () => {mousedown = false});
fullScreenButton.addEventListener("click" , togglefullscreen)