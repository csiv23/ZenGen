import React, { useState, useRef } from 'react';
import axios from 'axios';
import MeditationPlayer from './MeditationPlayer';
import MeditationForm from './MeditationForm';

window.onbeforeunload = function() {
  window.speechSynthesis.cancel();
}


function App() {
  const [lengthChoice, setLengthChoice] = useState('short');
  const [focusChoice, setFocusChoice] = useState('stress');
  const [methodChoice, setMethodChoice] = useState('none');
  const [meditationText, setMeditationText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState("");



  const player = useRef(new MeditationPlayer());

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 1000); // The toast will disappear after 1 second
};

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

  const handleTogglePlay = () => {
    if (isPlaying) {
      player.current.pauseMeditation();
      showToast("Pausing..."); // Show the toast notification
    } else {
      if (window.speechSynthesis.paused) {
        player.current.resumeMeditation();
      } else {
        player.current.playMeditation(meditationText);
      }
    }
    setIsPlaying(!isPlaying);  // Toggle the play state
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
    <button onClick={handleTogglePlay} disabled={!meditationText}>
      {isPlaying ? 'Pause Meditation' : 'Play Meditation'}
    </button>
    
    {/* Toast Message */}
    {toastMessage && (
      <div className="toast">
        {toastMessage}
      </div>
    )}
  </div>
);

}

export default App;
