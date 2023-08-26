import React from 'react';

function MeditationForm({ lengthChoice, setLengthChoice, focusChoice, setFocusChoice, methodChoice, setMethodChoice, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Length of meditation:
                <select value={lengthChoice} onChange={e => setLengthChoice(e.target.value)}>
                    <option value="short">Short (2-3 min)</option>
                    <option value="medium">Medium (3-5 min)</option>
                    <option value="long">Long (10 min)</option>
                </select>
            </label>
            <label>
                Select your focus:
                <select value={focusChoice} onChange={e => setFocusChoice(e.target.value)}>
                    <option value="stress">Stress</option>
                    <option value="relationships">Relationships</option>
                    <option value="stoicism">Stoicism</option>
                    <option value="buddhism">Buddhism</option>                    </select>
            </label>
            <label>
                Select your meditation method:
                <select value={methodChoice} onChange={e => setMethodChoice(e.target.value)}>
                    <option value="none">None</option>
                    <option value="body_scan">Body Scan</option>
                    <option value="visualization">Visualization</option>
                    <option value="breathing">Breathing</option>
                    <option value="guided_journey">Guided Journey</option>          </select>
            </label>
            <input type="submit" value="Generate Meditation" />
        </form>
    );
}

export default MeditationForm;
