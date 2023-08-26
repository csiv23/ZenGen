import React from 'react';
import './FocusChoice'; // For custom styles

function MethodChoice({ methodChoice, setMethodChoice }) {
    const methods = ["none", "guided", "mantra"];

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="mb-3">Meditation Method:</p>
            <div className="btn-group-vertical">
                {methods.map(method => (
                    <button
                        key={method}
                        type="button"
                        className={`btn btn-light focus-btn ${methodChoice === method ? 'active' : ''}`}
                        onClick={() => setMethodChoice(method)}
                    >
                        {method === 'none' ? 'None' : method.charAt(0).toUpperCase() + method.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MethodChoice;
