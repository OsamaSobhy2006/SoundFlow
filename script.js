// get the whole buttons
var audio = document.querySelector('audio');
var img = document.querySelector('.image-container img');
var head = document.getElementById('head');
var volumeRange = document.getElementById('volumeRange');
var mute = document.getElementById('mute');
var volumeValue = document.getElementById('volumeValue');
var durationTime = document.getElementById('durationTime');
var durationRange = document.getElementById('durationRange');
var totalDuration = document.getElementById('totalDuration');
var play = document.getElementById('play');
var backward = document.getElementById('backward');
var pause = document.getElementById('pause');
var stop = document.getElementById('stop');
var speed = document.getElementById('speed');
var forward = document.getElementById('forward');


// create the songs array of objects
let songs = [
    {
        name: 'Ana Negm',
        src: 'audio/ananegm.mp3',
        img: 'images/image-1.png'
    },
    {
        name: 'Basrah W Atoh',
        src: 'audio/basrah.mp3',
        img: 'images/image-3.png'
    },
    {
        name: 'Samorai',
        src: 'audio/samorai.mp3',
        img: 'images/image-2.png'
    },
    {
        name: 'Tayer',
        src: 'audio/tayer.mp3',
        img: 'images/maxresdefault.jpg'
    },

];
const playlist = document.querySelector('.playlist');
playlist.innerHTML = `
    <h2 class="playlist-title">Playlist</h2>
`;

songs.forEach((song, i) => {
    const item = document.createElement('div');
    item.classList.add('song');
    item.innerHTML = `
        <img src="${song.img}">
        
        <div class="song-info">
            <h4>${song.name}</h4>
        </div>
    `;

    item.addEventListener('click', () => {
        index = i;
        loadSong();
        audio.load();
        audio.play();
        updateActiveSong();
    });

    playlist.appendChild(item);
});
let index = 0;

// create a function that loads the song
function loadSong(){
    audio.src = songs[index].src;
    img.src = songs[index].img;
    head.textContent = songs[index].name;
    renderPlaylist()
    updateActiveSong()
    
}

function updateActiveSong(){
    document.querySelectorAll('.song').forEach(song => song.classList.remove('active'));

    document.querySelectorAll('.song')[index].classList.add('active');
}

function renderPlaylist(){
    playlist.innerHTML = `
        <h2 class="playlist-title">Playlist</h2>
    `;

    songs.forEach((song, i) => {
        const item = document.createElement('div');
        item.classList.add('song');

        item.innerHTML = `
            <img src="${song.img}">
            <div class="song-info">
                <h4>${song.name}</h4>
            </div>
        `;

        item.addEventListener('click', () => {
            const selectedSong = songs.splice(i, 1)[0];
            songs.unshift(selectedSong);
            index = 0;
            renderPlaylist();
            loadSong();
            audio.play();
        });

        playlist.appendChild(item);
    });
}
// enable the forward button to play the next song
forward.addEventListener('click', function(){
    index++;
    if(index > songs.length - 1){
        index = 0;
    }
    loadSong();
    audio.load();
    audio.play();
});

// enable the backward button to play the previous song
backward.addEventListener('click', function(){
    index--;
    if(index < 0){
        index = songs.length - 1;
    }
    loadSong();
    audio.load();
    audio.play();
});

// enable the speed button to change the speed of the song
speed.addEventListener('click', function(){
    audio.playbackRate = (audio.playbackRate === 1.5) ? 1 : 1.5;
});

// change the volume range
volumeRange.addEventListener('input', function(){
    audio.volume = this.value;
});

// enable the mute button when clicking on
mute.addEventListener('click', function(){
    audio.muted = !audio.muted;
    mute.classList.toggle('fa-volume-xmark');
});

// change the duration of the song depending on the audio
audio.addEventListener('loadedmetadata', function(){
    updateDuration();
    durationRange.max = audio.duration;
});

// update the duration of the song
audio.addEventListener('timeupdate', function(){
    var dur = Math.floor(audio.currentTime);
    var min = Math.floor(dur / 60) < 10 ? `0${Math.floor(dur / 60)}` : Math.floor(dur / 60);
    var sec = dur % 60 < 10 ? `0${dur % 60}` : dur % 60;
    durationTime.textContent = `${min}:${sec}`;
    
    durationRange.value = audio.currentTime;
});

// update the duration of the song
function updateDuration(){
    var dur = Math.floor(audio.duration);
    var min = Math.floor(dur / 60) < 10 ? `0${Math.floor(dur / 60)}` : Math.floor(dur / 60);
    var sec = dur % 60 < 10 ? `0${dur % 60}` : dur % 60;
    totalDuration.textContent = `${min}:${sec}`;
}

// enable play button to play the song
play.addEventListener('click', function () {
    audio.play();
});

// enable pause button to pause the song
pause.addEventListener('click', function () {
    audio.pause();
});

// enable stop button to stop the song
stop.addEventListener('click', function(){
    audio.currentTime = 0;
    audio.pause();
});

durationRange.addEventListener('change', function(){
    audio.currentTime = this.value;
});

loadSong();