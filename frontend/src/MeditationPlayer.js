class MeditationPlayer {
    constructor() {
        this.lastTimestamp = 0;
        this.voices = window.speechSynthesis.getVoices();
        this.selectedVoice = this.voices.find(voice => voice.name === 'Google UK English Female') || this.voices[0];
    }

    splitLines(meditationText) {
        const lines = meditationText.split("\n");
        return lines.filter(line => line.includes(" - ") && line.includes(":"));
    }

    getTimestamp(line) {
        const [timeStr] = line.split(" - ");
        const [minutes, seconds] = timeStr.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    speak(content, callback) {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.voice = this.selectedVoice;
        utterance.rate = 0.85; // slower pace
        utterance.pitch = 0.9; // slightly deeper
        utterance.onend = callback; // Assign the callback function to the onend event
        window.speechSynthesis.speak(utterance);
    }

    playMeditation(meditationText) {
        const meditationLines = this.splitLines(meditationText);

        const playLine = (index) => {
            if (index >= meditationLines.length) return;

            const line = meditationLines[index];
            const timestamp = this.getTimestamp(line);
            const [, content] = line.split(" - ");

            const delay = index === 0 ? 0 : (timestamp - this.lastTimestamp) * 1000;

            setTimeout(() => {
                this.speak(content, () => {
                    this.lastTimestamp = timestamp;
                    playLine(index + 1); // Play the next line after the current one is done.
                });
            }, delay);
        }

        playLine(0);  // Start with the first line.
    }
}

export default MeditationPlayer;

