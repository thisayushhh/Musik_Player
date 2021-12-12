console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Drake - Way 2 Sexy (Audio) ft. Future, Young Thug",         filePath: "songs/1.mp3", coverPath: "covers/1_1.png"},
    {songName: "DJ Khaled ft. Drake - GREECE",                              filePath: "songs/2.mp3", coverPath: "covers/2_2.jfif"},
    {songName: "Glass Animals - Heat Waves",                                filePath: "songs/3.mp3", coverPath: "covers/3_3.jpg"},
    {songName: "Crypto - ...Baby One More Time",                            filePath: "songs/4.mp3", coverPath: "covers/4_4.jfif"},
    {songName: "Glass Animals - I Don't Wanna Talk (I Just Wanna Dance)",   filePath: "songs/5.mp3", coverPath: "covers/5_5.png"},
    {songName: "Meek Mill, Drake - Going Bad",                              filePath: "songs/6.mp3", coverPath: "covers/6_6.jpg"},
    {songName: "The Weeknd & Ariana Grande - Save Your Tears",              filePath: "songs/7.mp3", coverPath: "covers/7_7.jpg"},
    {songName: "Sia - Cheap Thrills ft. Sean Paul",                         filePath: "songs/8.mp3", coverPath: "covers/8_8.jfif"},
    {songName: "Younger Hunger - Dead Inside (Official Audio)",             filePath: "songs/9.mp3", coverPath: "covers/9_9.jpg"},
    {songName: "Charlie Puth - We Don't Talk Anymore ft Selena Gomez",      filePath: "songs/10.mp3", coverPath: "covers/10_10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})