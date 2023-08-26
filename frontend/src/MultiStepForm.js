import React, { useState } from 'react';
import LengthChoice from './choices/LengthChoice';
import FocusChoice from './choices/FocusChoice';
import MethodChoice from './choices/MethodChoice';

function MultiStepForm(props) {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            props.handleSubmit();
        }
    };


    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div>
            {currentStep === 1 && (
                <LengthChoice
                    lengthChoice={props.lengthChoice}
                    setLengthChoice={props.setLengthChoice}
                />
            )}

            {currentStep === 2 && (
                <FocusChoice
                    focusChoice={props.focusChoice}
                    setFocusChoice={props.setFocusChoice}
                />
            )}

            {currentStep === 3 && (
                <MethodChoice
                    methodChoice={props.methodChoice}
                    setMethodChoice={props.setMethodChoice}
                />
            )}

            <div>
                {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
                <button onClick={nextStep}>
                    {currentStep < 3 ? 'Next' : 'Generate Meditation'}
                </button>
            </div>
        </div>
    );
}

export default MultiStepForm;
