import React, { useState, useRef } from 'react';
import axios from 'axios';
import MeditationPlayer from './MeditationPlayer';
import MeditationForm from './MeditationForm';



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
    <div className="app-container">
      <h1>Welcome to the Meditation App</h1>
      <MeditationForm
        lengthChoice={lengthChoice}
        setLengthChoice={setLengthChoice}
        focusChoice={focusChoice}
        setFocusChoice={setFocusChoice}
        methodChoice={methodChoice}
        setMethodChoice={setMethodChoice}
        handleSubmit={handleSubmit}
      />
      <button onClick={handlePlay} disabled={!meditationText}>
        Play Meditation
      </button>
    </div>
  );
}

export default App;
