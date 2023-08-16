class MeditationPlayer {
    constructor() {
        this.lastTimestamp = 0;
        this.voices = window.speechSynthesis.getVoices();
        this.selectedVoice = this.voices.find(voice => voice.name === 'Google UK English Female') || this.voices[0];
    }

    splitLines(meditationText) {
        const lines = meditationText.split("\n");
        const validLines = [];
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
    
            // Check if line contains a timestamp
            if (line.includes(" - ") && line.includes(":")) {
                validLines.push(line);
    
                // If the next line doesn't contain a timestamp, break out of the loop
                if (i + 1 < lines.length && (!lines[i + 1].includes(" - ") || !lines[i + 1].includes(":"))) {
                    break;
                }
            }
        }
    
        return validLines;
    }

    getTimestamp(line) {
        const [timeStr] = line.split(" - ");
        const [minutes, seconds] = timeStr.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    speak(content) {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.voice = this.selectedVoice;
        utterance.rate = 0.85; // slower pace
        utterance.pitch = 0.9; // slightly deeper
        window.speechSynthesis.speak(utterance);
    }

    playMeditation(meditationText) {
        const meditationLines = this.splitLines(meditationText);

        meditationLines.forEach((line) => {
            const timestamp = this.getTimestamp(line);
            const delay = (timestamp - this.lastTimestamp) * 1000;
            const [, content] = line.split(" - ");

            setTimeout(() => {
                this.speak(content);
            }, delay);

            this.lastTimestamp = timestamp;
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('meditationForm');
    const playButton = document.getElementById('playMeditation');

    const player = new MeditationPlayer();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const formData = new URLSearchParams(new FormData(form)).toString();

        // Send data to server
        fetch("/generate_meditation", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
        })
        .then(data => {
            if (data.success) {
                console.log(data.meditation_text);

                // Set the meditation text as a data attribute on the play button
                playButton.setAttribute('data-text', data.meditation_text);

                // Enable the play button now that we have meditation text
                playButton.disabled = false;
            } else {
                console.error("Error generating meditation:", data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Add an event listener to the play button for TTS
    playButton.addEventListener('click', function() {
        const textToSpeak = playButton.getAttribute('data-text');
        if (textToSpeak) {
            player.playMeditation(textToSpeak);
        }
    });
});
