const resultElement = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn")
let recognition;

function startConverting() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        setupRecogniction(recognition);
        recognition.start();
    }
}

function setupRecogniction(recognition) {

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const { finalTranscript, interTranscript } = processResult(event.results);
        resultElement.innerHTML = finalTranscript + interTranscript;
    }
}

function processResult(results) {
    let finalTranscript = '';
    let interTranscript = '';
    let wordCount = document.getElementById("word-count")

    for (let i = 0; i < results.length; i++) {
        let transcript = results[i][0].transcript;
        transcript = transcript.replace(/\n/g, "<br>");

        if (results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interTranscript += transcript;
        }
    }

    wordCount.innerText = finalTranscript.split("").length

    let cleanText = finalTranscript.trim()
    if(cleanText == "") {
        wordCount.innerText = 0;
    } else {
        const words = cleanText.split(/\s+/)
        wordCount.innerText = words.length
    }
    return { finalTranscript, interTranscript };
}

function stopConverting() {
    if (recognition) {
        recognition.stop();
    }
}
function reset() {

    resultElement.innerHTML = ""
}

function copyText() {
    const textToCopy = resultElement.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        let icon = document.getElementById("check");
        let icon1 = document.getElementById("icon1")
        let copyBtn = document.getElementById("copy-btn")
        icon1.style.display = "none";
        icon.style.display = "block";
        copyBtn.style.background = "#4bc475";
        setTimeout(function () {
            icon1.style.display = "block";
            icon.style.display = "none";
            copyBtn.style.background = "";
        }, 2000)
    })
}

function readAloud() {
    const textToRead = resultElement.innerText;
    if (!textToRead) {
        alert("Nothing to read!")
        return;
    }
    const speech = new SpeechSynthesisUtterance(textToRead)
    speech.lang = 'en-US';
    speech.volume = 100;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech)
}
