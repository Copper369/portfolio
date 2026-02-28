import React, { useEffect, useState } from 'react'

const PreLoader = () => {
    const [loader, handleLoader] = useState(true);
    const [textFaded, setTextFaded] = useState(false);
    
    useEffect(() => {
        // Fade out text after 2.5 seconds
        setTimeout(() => {
            setTextFaded(true);
        }, 2500);
        
        // Remove entire loader after 4 seconds
        setTimeout(() => {
            const root = document.documentElement;
            root.style.setProperty('--scrollBarWidth', '8px');
            handleLoader(false)
        }, 4000)
    }, [])

    return (
        <div className={`ai-pre-loader ${loader ? 'ai-pre-loader-enabled' : 'ai-pre-loader-disabled'}`}>
            <div className='ai-pre-loader-boarder' />
            <div className='ai-pre-loader-container'>
                <div className={`favicon-watermark ${textFaded ? 'flip-and-fly' : ''}`}>
                    <img src="/icons/512.png" alt="Logo" />
                </div>
                <div className={`welcome-text ${textFaded ? 'fade-out' : ''}`}>
                    <div className='plant-signature'>
                        <svg viewBox="0 0 120 100" className="plant-svg">
                            {/* Ground/Soil */}
                            <ellipse 
                                className="ground" 
                                cx="60" 
                                cy="85" 
                                rx="35" 
                                ry="8" 
                                fill="#8B7355"
                            />
                            <ellipse 
                                className="ground-shadow" 
                                cx="60" 
                                cy="85" 
                                rx="30" 
                                ry="6" 
                                fill="#6B5345"
                            />
                            
                            {/* Stem */}
                            <line 
                                className="stem" 
                                x1="60" 
                                y1="85" 
                                x2="60" 
                                y2="45" 
                                stroke="#7CB342" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                            />
                            
                            {/* Left Leaf - Angled upward (obtuse angle) */}
                            <ellipse 
                                className="leaf leaf-left" 
                                cx="32" 
                                cy="40" 
                                rx="20" 
                                ry="12" 
                                fill="#9CCC65"
                                stroke="#7CB342"
                                strokeWidth="1.5"
                                transform="rotate(-50 32 40)"
                            />
                            
                            {/* Right Leaf - Angled upward (obtuse angle) */}
                            <ellipse 
                                className="leaf leaf-right" 
                                cx="88" 
                                cy="48" 
                                rx="20" 
                                ry="12" 
                                fill="#9CCC65"
                                stroke="#7CB342"
                                strokeWidth="1.5"
                                transform="rotate(50 88 48)"
                            />
                            
                            {/* Leaf veins for detail */}
                            <line 
                                className="vein vein-left" 
                                x1="60" 
                                y1="46" 
                                x2="32" 
                                y2="40" 
                                stroke="#7CB342" 
                                strokeWidth="1" 
                                opacity="0.6"
                            />
                            <line 
                                className="vein vein-right" 
                                x1="60" 
                                y1="48" 
                                x2="88" 
                                y2="48" 
                                stroke="#7CB342" 
                                strokeWidth="1" 
                                opacity="0.6"
                            />
                        </svg>
                    </div>
                    <h1 className='welcome-line'>
                        <span className='word'>Welcome</span>
                        <span className='word'>to</span>
                        <span className='word'>my</span>
                        <span className='word'>Portfolio</span>
                    </h1>
                </div>
                <div className={`loading-bar ${textFaded ? 'fade-out' : ''}`}>
                    <div className='loading-progress'></div>
                </div>
            </div>
        </div>
    )
}

PreLoader.propTypes = {}

export default PreLoader
