console.log("Welcome to Emusic");
//initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Jai Shree Ram" , filePath:"songs/1.mp3" , coverPath:"Covers/songcover.jpg"} ,
    {songName:"Tum Saath Ho" , filePath:"songs/2.mp3" , coverPath:"Covers/tumsathhoCOVER.png"} ,
    {songName:"Brown Munde" , filePath:"songs/3.mp3" , coverPath:"Covers/browncover.png"} ,
    {songName:"Baatein Ye Kabhi Na" , filePath:"songs/4.mp3" , coverPath:"Covers/batecover.png"} ,
    {songName:"Let Me Love You" , filePath:"songs/5.mp3" , coverPath:"Covers/COVER2.jpg"} ,
]

songItem.forEach((element , i )=>{
    //console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

//audioElement.play()

//handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate' , ()=>{
    console.log('timeupdate')
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , ()=> {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100)
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        console.log("This line has executed.");    
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = (`songs/${songIndex+1}.mp3`);
        //audioElement.src = ('songs/Brown Munde - AP Dhillon.mp3');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0; 
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex += 1
    }
    //audioElement.src = ('songs/Tum Saath Ho.mp3');
    audioElement.src = (`songs/${songIndex + 1}.mp3`);
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0; 
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<0){
        songIndex = 0;
    }
    else{
        songIndex -= 1
    }
    audioElement.src = (`songs/${songIndex + 1}.mp3`);
    //audioElement.src = ('songs/Let Me Love You.mp3');
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



document.querySelector('.play-button').addEventListener('click' , ()=>{
    audioElement.src = ('topsongs/Banjaara - Ek Villain.mp3');
    audioElement.play();
})

function openNewPage(pageUrl) {
    window.open(pageUrl, '_blank');
}