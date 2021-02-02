const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector(".full");




function togglePlay(){
    console.log({video});
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateBtn(){
    console.log("update");
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip);

    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    // this.name is either volume or playbackRate
    video[this.name] = this.value;
    console.log(this.value);
    console.log(this.name);
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    if (!video.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (video.exitFullscreen) {
        video.exitFullscreen();
      }
    }
  }

video.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);
full.addEventListener("click", toggleFullScreen);



toggle.addEventListener("click", togglePlay); 
skipButtons.forEach(s => {
    s.addEventListener("click", skip);
});
ranges.forEach(s => {
    s.addEventListener("click", handleRangeUpdate);
});
ranges.forEach(s => {
    s.addEventListener("change", handleRangeUpdate);
});
ranges.forEach(s => {
    s.addEventListener("mousemove", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
// if mousedown == true scrube
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);