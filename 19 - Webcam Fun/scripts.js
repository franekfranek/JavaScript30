const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// alert("Używasz " + navigator.appName);
function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream =>{
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
        console.log(video);
    })
    .catch( error => {
        console.log('Please allow webacam access', error);
    })
}

function paintToCanvas(){
    const width =  video.videoWidth;
    const height =  video.videoHeight;
    console.log(width, height);

    canvas.width = 200;
    canvas.height = 150;

    return setInterval(() =>{
        ctx.drawImage(video, 0, 0, 200, 150);
    }, 16)
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

getVideo();
paintToCanvas();