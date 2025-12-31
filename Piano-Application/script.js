
const keys = document.querySelectorAll(".key");

const whiteKeys = document.querySelectorAll(".key.white");

const blackKeys = document.querySelectorAll(".key.black");

keys.forEach(key => key.addEventListener("click",handleKeyClick));

function handleKeyClick(){
    playKey(this);
}

function playKey(key){
   
    const keyAudio = document.getElementById(key.dataset.note); 
    
    keyAudio.currentTime = 0;

    keyAudio.play();

    key.classList.add("active");

    keyAudio.addEventListener("ended",()=>{

        key.classList.remove("active");

    });

    
}
 document.addEventListener("keydown", (e) => {
    console.log(e.key);

    const whiteKeyLetters = ['z', 'x', 'c', 'v', 'b', 'n', 'm',]
    const blackKeyLetters = ['s', 'd', 'g', 'h', 'j']

    const whiteIndex = whiteKeyLetters.indexOf(e.key)
    const blackIndex = blackKeyLetters.indexOf(e.key)

    if (whiteIndex > -1) {
        playKey(whiteKeys[whiteIndex])
    }

        if (blackIndex > -1) {
        playKey(blackKeys[blackIndex])
    }
 })
