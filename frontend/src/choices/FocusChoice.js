import React, { useState, useEffect } from 'react';

function FocusChoice({ focusChoice, setFocusChoice }) {
    const [selectedOption, setSelectedOption] = useState(focusChoice);
    const [otherText, setOtherText] = useState('');

    useEffect(() => {
        // Update parent state when local states change
        if (selectedOption === 'other') {
            setFocusChoice(otherText);
        } else {
            setFocusChoice(selectedOption);
        }
    }, [selectedOption, otherText]);

    return (
        <div>
            <label htmlFor="focusChoice">Focus of Meditation:</label>
            <select
                id="focusChoice"
                value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}
            >
                <option value="stress">Stress</option>
                <option value="relaxation">Relaxation</option>
                <option value="concentration">Concentration</option>
                <option value="other">Other</option>
            </select>

            {selectedOption === 'other' && (
                <div>
                    <label htmlFor="otherChoice">Specify:</label>
                    <input
                        type="text"
                        id="otherChoice"
                        value={otherText}
                        onChange={e => setOtherText(e.target.value)}
                        placeholder="Enter your focus"
                    />
                </div>
            )}
        </div>
    );
}

export default FocusChoice;
