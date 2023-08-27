import React, { useState } from 'react';
import '../../styles/FocusChoice.css'; // For custom styles

function FocusChoice({ focusChoice, setFocusChoice }) {
    const options = ["stress", "concentration", "relationships"];
    const [otherValue, setOtherValue] = useState("");  // To hold the value of the "other..." input

    // Function to handle the change in "other..." input
    const handleOtherChange = (event) => {
        const value = event.target.value;
        setOtherValue(value);
        setFocusChoice(value);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="mb-3">Focus of Meditation:</p>
            <div className="btn-group-vertical">
                {options.map(option => (
                    <button
                        key={option}
                        type="button"
                        className={`btn btn-light length-btn ${focusChoice === option ? 'active' : ''}`}
                        onClick={() => setFocusChoice(option)}
                    >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                ))}
                <input 
                    type="text" 
                    placeholder="Other..." 
                    value={otherValue}
                    onChange={handleOtherChange} 
                    className="form-control mt-2"  // Using Bootstrap's form-control class for styling
                />
            </div>
        </div>
    );
}

export default FocusChoice;
