import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationButtons({ onPrevious, onNext, showPrevious, nextLabel }) {
    return (
        <div className="container mt-4">
            {/* Vertical Alignment */}
            <div className="d-flex flex-column align-items-center">
                {showPrevious && <button className="btn btn-secondary mb-2" onClick={onPrevious}>← Previous</button>}
                <button className="btn btn-primary" onClick={onNext}>{nextLabel}</button>
            </div>
            
            {/* Horizontal Alignment 
            <div className="d-flex justify-content-between">
                {showPrevious ? <button className="btn btn-secondary" onClick={onPrevious}>← Previous</button> : <div></div>}
                <button className="btn btn-primary" onClick={onNext}>{nextLabel}</button>
            </div> 
            */}
        </div>
    );
}

export default NavigationButtons;
