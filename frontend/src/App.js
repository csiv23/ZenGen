import React, { useState, useRef } from 'react';
import axios from 'axios';

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


function App() {
  const [lengthChoice, setLengthChoice] = useState('short');
  const [focusChoice, setFocusChoice] = useState('stress');
  const [methodChoice, setMethodChoice] = useState('none');
  const [meditationText, setMeditationText] = useState('');

  const player = useRef(new MeditationPlayer()); // Use useRef to persist the player instance across re-renders


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new URLSearchParams({
      length_choice: lengthChoice,
      focus_choice: focusChoice,
      method_choice: methodChoice
    });
    axios.post('http://localhost:5000/generate_meditation', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        console.log("Server Response:", response.data.meditation_text);  // <-- This will print the response to the console

        if (response.data.success) {
          setMeditationText(response.data.meditation_text);
        } else {
          console.error('Error generating meditation:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
  };



  const handlePlay = () => {
    player.current.playMeditation(meditationText);
  };

  return (
    <div>
      <h1>Welcome to the Meditation App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Length of meditation:
          <select value={lengthChoice} onChange={e => setLengthChoice(e.target.value)}>
            <option value="short">Short (2-3 min)</option>
            <option value="medium">Medium (3-5 min)</option>
            <option value="long">Long (10 min)</option>
          </select>
        </label>
        <label>
          Select your focus:
          <select value={focusChoice} onChange={e => setFocusChoice(e.target.value)}>
            <option value="stress">Stress</option>
            <option value="relationships">Relationships</option>
            <option value="stoicism">Stoicism</option>
            <option value="buddhism">Buddhism</option>                    </select>
        </label>
        <label>
          Select your meditation method:
          <select value={methodChoice} onChange={e => setMethodChoice(e.target.value)}>
            <option value="none">None</option>
            <option value="body_scan">Body Scan</option>
            <option value="visualization">Visualization</option>
            <option value="breathing">Breathing</option>
            <option value="guided_journey">Guided Journey</option>          </select>
        </label>
        <input type="submit" value="Generate Meditation" />
      </form>
      <button onClick={handlePlay} disabled={!meditationText}>Play Meditation</button>
    </div>
  );
}

export default App;
