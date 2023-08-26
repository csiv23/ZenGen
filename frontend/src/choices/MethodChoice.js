import React from 'react';

function MethodChoice({ methodChoice, setMethodChoice }) {
    return (
        <div>
            <label htmlFor="methodChoice">Meditation Method:</label>
            <select
                id="methodChoice"
                value={methodChoice}
                onChange={e => setMethodChoice(e.target.value)}
            >
                <option value="none">None</option>
                <option value="guided">Guided</option>
                <option value="mantra">Mantra</option>
            </select>
        </div>
    );
}

export default MethodChoice;
