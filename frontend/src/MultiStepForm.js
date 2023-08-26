import React, { useState } from 'react';
import LengthChoice from './choices/LengthChoice';
import FocusChoice from './choices/FocusChoice';
import MethodChoice from './choices/MethodChoice';
import NavigationButtons from './NavigationButtons';

function MultiStepForm(props) {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 3) {
            props.handleSubmit();
            setCurrentStep(4);  // move to "Generating Meditation..." screen
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

            {currentStep === 4 && <div>Generating Meditation...</div>}

            {currentStep === 5 && <div>Play Meditation screen placeholder</div>}

            {(currentStep !== 4) && (
                <NavigationButtons 
                    onPrevious={prevStep} 
                    onNext={nextStep} 
                    showPrevious={currentStep > 1} 
                    nextLabel={currentStep < 3 ? 'Next' : 'Submit'}
                />
            )}
        </div>
    );
}

export default MultiStepForm;
