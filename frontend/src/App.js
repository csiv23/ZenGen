import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import IntroPage from './components/IntroPage';
import MeditationPlayer from './MeditationPlayer';
import MultiStepForm from './components/MultiStepForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Fallback to localhost if the variable is not set


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

  useEffect(() => {
    const setVHProperty = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    // Call the function when the component mounts
    setVHProperty();
    // Add the event listener
    window.addEventListener('resize', setVHProperty);

    // Cleanup - remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', setVHProperty);
  }, []);



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
    axios.post(`${BACKEND_URL}/generate_meditation`, formData.toString(), {
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
          <button className="btn-play mb-2" onClick={handleTogglePlay}>
            {isPlaying
              ? <i className="bi bi-pause"></i>
              : <i className="bi bi-play"></i>
            }
          </button>
          <br />
          <button className="btn btn-secondary mt-3" onClick={handleRestart}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="#1E88E5" />
            </svg>
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
