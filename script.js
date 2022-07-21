const audio = document.querySelector('#audio')
const playPauseBtn = document.querySelector('#stop')
const nextBtn = document.querySelector('#siguiente')
const previusBtn = document.querySelector('#anterior')
const songList = document.querySelector('.songList')
const title = document.querySelector('#title')
const imgReproductor = document.querySelector('.imgReproductor')
const sliderVolIput = document.querySelector('.sliderVolIput')

let songArray = [];
let songHeading = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio(){
    audio.src = songArray[songIndex];

    let songListItems = songList.getElementsByTagName('li');
    songHeading = songListItems[songIndex].getAttribute('data-name');
    title.innerHTML = songHeading;

    for(i=0; i<songListItems.length; i++){
        songListItems[i].classList.remove('active');
    }

    songList.getElementsByTagName('li')[songIndex].classList.add('active')
}

function loadSongs(){
    let songs = songList.getElementsByTagName('li');
    for(i=0; i<songs.length;i++){
        songArray.push(songs[i].getAttribute('data-src'));
    };

    loadAudio();
}

loadSongs();

function playAudio(){
    audio.play();
    isPlaying = true;
    imgReproductor.classList.add('imgReproductor-animation')
    
}

function pauseAudio(){
    audio.pause();

    isPlaying = false;
    imgReproductor.classList.remove('imgReproductor-animation')
    
}

function nextSong(){
    songIndex++;
    if(songIndex > songArray.length - 1){
        songIndex = 0;
    }
    loadAudio();
    playAudio();
}

function previousSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songArray.length - 1;
    };
    loadAudio();
    playAudio();
}

playPauseBtn.addEventListener('click', function(){
    if(isPlaying){
        pauseAudio(); 
        
    }else{
        playAudio();
    }
},false)


nextBtn.addEventListener('click', function(){
    nextSong();
} , false); 

previusBtn.addEventListener('click', function(){
    previousSong();
} , false); 

songList.addEventListener('click', function(e){
    songIndex = e.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();

},false);

audio.addEventListener('ended',function(){
    nextSong();
},false)

sliderVolIput.addEventListener('input',function(){
    audio.volume = sliderVolIput.value / 100;
},false );