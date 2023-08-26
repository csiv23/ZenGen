import React from 'react';

function LengthChoice({ lengthChoice, setLengthChoice }) {
    return (
        <div>
            <label htmlFor="lengthChoice">Length of Meditation:</label>
            <select
                id="lengthChoice"
                value={lengthChoice}
                onChange={e => setLengthChoice(e.target.value)}
            >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
            </select>
        </div>
    );
}

export default LengthChoice;
