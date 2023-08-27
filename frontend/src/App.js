import React, { useState, useRef } from 'react';
import axios from 'axios';
import IntroPage from './IntroPage';
import MeditationPlayer from './MeditationPlayer';
import MultiStepForm from './MultiStepForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


window.onbeforeunload = function () {
  window.speechSynthesis.cancel();
}




function App() {
  const [lengthChoice, setLengthChoice] = useState('short');
  const [focusChoice, setFocusChoice] = useState('stress');
  const [methodChoice, setMethodChoice] = useState('none');
  const [meditationText, setMeditationText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  const player = useRef(new MeditationPlayer());

  const handleRestart = () => {
    setMeditationText(''); // Clear the generated meditation text
    setIsPlaying(false);   // Ensure the player is not playing
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
  
    // Reset form defaults
    setLengthChoice('short');
    setFocusChoice('stress');
    setMethodChoice('none');
  };
  


  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 1000); // The toast will disappear after 1 second
  };

  const handleIntroProceed = () => {
    setShowIntro(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

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
      {showIntro ? (
        <IntroPage onProceed={handleIntroProceed} />
      ) : meditationText ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <button className="btn btn-primary mb-2" onClick={handleTogglePlay}>
            {isPlaying ? 'Pause Meditation' : 'Play Meditation'}
          </button>
          <br />
          <button className="btn btn-secondary" onClick={handleRestart}>
            Restart Form
          </button>
        </div>
      ) : (
        <MultiStepForm
          lengthChoice={lengthChoice}
          setLengthChoice={setLengthChoice}
          focusChoice={focusChoice}
          setFocusChoice={setFocusChoice}
          methodChoice={methodChoice}
          setMethodChoice={setMethodChoice}
          meditationGenerated={!!meditationText}
          handleSubmit={handleSubmit}
        />
      )}

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
