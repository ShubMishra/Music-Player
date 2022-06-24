const  musicContainer=document.querySelector('.music-container');
const  musicInfo=document.querySelector('.music-info');
const  prevBtn=document.querySelector('#prev');
const  nextBtn=document.querySelector('#next');
const  playBtn=document.querySelector('#play');
const  audio=document.querySelector('#audio');
const progress=document.querySelector('.progress');
const progressContainer=document.querySelector('.progress-container');
const title=document.querySelector('#title');
const cover=document.querySelector('.cover');

//song titles
const songs=['cute1','cute2'];

//keep trac of songs
let songIndex=0;

//Initially load songs info from DOM
loadSong(songs[songIndex]);


//update song details
function loadSong(song)
{
    title.innerText=song;
    audio.src=`sounds/${song}.mp3`;
    cover.src='images/'+song+'.jpg';
}
function playSong(){
musicContainer.classList.add('play');
playBtn.querySelector('.fas').classList.remove('fa-play');
playBtn.querySelector('.fas').classList.add('fa-pause');
audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fas').classList.remove('fa-pause');
playBtn.querySelector('.fas').classList.add('fa-play');
audio.pause();
}
function prevSong(){
songIndex--;
if(songIndex<0)
songIndex=songs.length-1;

loadSong(songs[songIndex]);
playSong();
}
function nextSong(){
    songIndex++;
if(songIndex>=songs.length)
songIndex=0;

loadSong(songs[songIndex]);
playSong();
}

function updateProgress(e){
    const {duration, currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

function setProgress(e){
    const width=this.clientWidth ;
    
     const clickX=e.offsetX;
    
     const duration=audio.duration;

     audio.currentTime=(clickX/width)*duration

}
//event listbers
playBtn.addEventListener('click',function(){
    const isPlaying=musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

//change song
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)