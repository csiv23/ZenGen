
import React from 'react';
import NavigationButtons from './NavigationButtons';

function IntroPage({onProceed}) {
    return (
        <div className="intro-container">
            <h1>ZenGen</h1>
            <p>Shaping Meditation to Fit You.</p>
            <NavigationButtons
                onNext={onProceed}
                showPrevious={false}
                nextLabel="Start"
            />
        </div>
    );
}

export default IntroPage;