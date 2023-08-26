import React from 'react';
import LengthChoice from './choices/LengthChoice';
import FocusChoice from './choices/FocusChoice';
import MethodChoice from './choices/MethodChoice';

function MeditationForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <LengthChoice 
                lengthChoice={props.lengthChoice}
                setLengthChoice={props.setLengthChoice} 
            />
            <FocusChoice 
                focusChoice={props.focusChoice}
                setFocusChoice={props.setFocusChoice}
            />
            <MethodChoice 
                methodChoice={props.methodChoice}
                setMethodChoice={props.setMethodChoice}
            />
            <button type="submit">Generate Meditation</button>
        </form>
    );
}

export default MeditationForm;
