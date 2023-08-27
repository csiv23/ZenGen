class MeditationPlayer {
    constructor() {
        this.initPlayer();
    }

    initPlayer() {
        this.currentLineIndex = 0;
        this.lastTimestamp = 0;
        this.timeouts = [];
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
        utterance.rate = 0.85; 
        utterance.pitch = 0.9;
        utterance.onend = callback;
        window.speechSynthesis.speak(utterance);
    }

    playMeditation(meditationText) {
        if (this.currentLineIndex === 0) {
            this.meditationLines = this.splitLines(meditationText);
        }

        const playLine = (index) => {
            if (index >= this.meditationLines.length) return;

            const line = this.meditationLines[index];
            const timestamp = this.getTimestamp(line);
            const [, content] = line.split(" - ");

            const delay = index === 0 ? 0 : (timestamp - this.lastTimestamp) * 1000;

            const timeout = setTimeout(() => {
                this.speak(content, () => {
                    this.lastTimestamp = timestamp;
                    this.currentLineIndex = index + 1;
                    playLine(this.currentLineIndex);
                });
            }, delay);
            this.timeouts.push(timeout);
        }

        playLine(this.currentLineIndex);
    }

    pauseMeditation() {
        this.timeouts.forEach(clearTimeout);
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    }

    resumeMeditation() {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    }

    resetPlayer() {
        this.timeouts.forEach(clearTimeout); // Clear all existing timeouts
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        this.initPlayer();  
    }
}

export default MeditationPlayer;
