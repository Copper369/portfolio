import React, { useEffect, useState } from 'react'

const PreLoader = () => {
    const [loader, handleLoader] = useState(true);
    const [textFaded, setTextFaded] = useState(false);
    const [logoZoom, setLogoZoom] = useState(false);
    const [typedText, setTypedText] = useState('');
    
    useEffect(() => {
        // Typing animation with mistake
        const typeSequence = async () => {
            // Type "Hello Word"
            const text1 = "Hello Word";
            for (let i = 0; i <= text1.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
                setTypedText(text1.slice(0, i));
            }
            
            // Pause to show the mistake
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Delete "d"
            await new Promise(resolve => setTimeout(resolve, 150));
            setTypedText("Hello Wor");
            
            // Pause
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Delete "r"
            await new Promise(resolve => setTimeout(resolve, 150));
            setTypedText("Hello Wo");
            
            // Pause
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Type "rl"
            await new Promise(resolve => setTimeout(resolve, 120));
            setTypedText("Hello Wor");
            await new Promise(resolve => setTimeout(resolve, 120));
            setTypedText("Hello Worl");
            
            // Type "d"
            await new Promise(resolve => setTimeout(resolve, 120));
            setTypedText("Hello World");
            
            // Pause to show the corrected text
            await new Promise(resolve => setTimeout(resolve, 800));
        };
        
        typeSequence();
        
        // Fade out text after 3.5 seconds
        setTimeout(() => {
            setTextFaded(true);
        }, 3500);
        
        // Start logo zoom after text fades
        setTimeout(() => {
            setLogoZoom(true);
        }, 4000);
        
        // Remove entire loader after 5 seconds
        setTimeout(() => {
            const root = document.documentElement;
            root.style.setProperty('--scrollBarWidth', '8px');
            handleLoader(false)
        }, 5000)
    }, [])

    return (
        <div className={`ai-pre-loader ${loader ? 'ai-pre-loader-enabled' : 'ai-pre-loader-disabled'}`}>
            <div className='ai-pre-loader-boarder' />
            <div className='ai-pre-loader-container'>
                <div className={`favicon-watermark ${logoZoom ? 'netflix-zoom' : ''}`}>
                    <img src="/icons/512.png" alt="Logo" />
                </div>
                <div className={`welcome-text ${textFaded ? 'fade-out' : ''}`}>
                    <h1 className='welcome-line'>
                        {typedText}<span className='cursor-blink'>|</span>
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
