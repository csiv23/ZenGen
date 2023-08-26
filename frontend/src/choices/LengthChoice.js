import React from 'react';
import '../FocusChoice.css'; // For custom styles

function LengthChoice({ lengthChoice, setLengthChoice }) {
    const lengths = ["short", "medium", "long"];

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="mb-3">Length of Meditation:</p>
            <div className="btn-group-vertical">
                {lengths.map(length => (
                    <button
                        key={length}
                        type="button"
                        className={`btn btn-light length-btn ${lengthChoice === length ? 'active' : ''}`}
                        onClick={() => setLengthChoice(length)}
                    >
                        {length.charAt(0).toUpperCase() + length.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default LengthChoice;
