import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParallax } from 'react-scroll-parallax';
import Star from '../../components/SVGs/Star';
import GitFork from '../../components/SVGs/GitFork';

const PhoneCopyButton = () => {
    const [copied, setCopied] = useState(false);
    const phone = '+91 9960670950';

    const handleCopy = () => {
        navigator.clipboard.writeText('9960670950').then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 173, 181, 0.1)',
                border: '1px solid #00ADB5',
                borderRadius: '8px',
                padding: '10px 18px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: '#00ADB5',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px',
            }}
        >
            <span>📞 {phone}</span>
            <span style={{ opacity: 0.8, fontSize: '12px' }}>
                {copied ? '✓ Copied!' : 'Copy'}
            </span>
        </button>
    );
};

const Contact = ({ data: {
    label,
    heading,
    description,
    button,
    handleBuiltByClick,
    designAndBuiltBy,
} }) => {

    const [githubInfo, setGitHubInfo] = useState({
        stars: null,
        forks: null,
    });

    useEffect(() => {
        fetch('https://api.github.com/repos/afzalimdad9/animated-portfolio')
            .then(response => response.json())
            .then(json => {
                const { stargazers_count, forks_count } = json;
                setGitHubInfo({
                    stars: stargazers_count,
                    forks: forks_count,
                });
            })
            .catch(e => console.error(e));
    }, []);

    const { ref } = useParallax({
        easing: 'easeIn',
        translateX: [-50, 0]
    });

    return (
        <div className='ai-contact'>
            <div
                ref={ref}
                className='ai-contact-zebra-img'
                style={{
                    backgroundImage: `url(${'/assets/arrow-sample.svg'})`,
                }}>
            </div>
            <div className='ai-contact-box' style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Supernova background */}
                <iframe
                    src="/blackhole"
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        border: 'none',
                        zIndex: 0,
                        pointerEvents: 'none',
                        opacity: 0.4,
                    }}
                    title="supernova"
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                <div className='container'>
                    <div className='ai-contact-content-wrapper'>
                        {/* Say Hello Section */}
                        <div className='ai-contact-info ai-contact-info-centered'>
                            <div className='ai-contact-label'>{label}</div>
                            <div className='ai-contact-title'>{heading}</div>
                            <div className='ai-contact-text'>{description}</div>
                            <div className='ai-contact-button'>
                                <a 
                                    href="mailto:ayushkarnewar369@gmail.com?subject=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
                                    className='ai-button'
                                    style={{ textDecoration: 'none', display: 'inline-block' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const mailto = 'mailto:ayushkarnewar369@gmail.com?subject=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D';
                                        const gmail = 'https://mail.google.com/mail/?view=cm&to=ayushkarnewar369@gmail.com&su=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D';
                                        const win = window.open(mailto, '_self');
                                        setTimeout(() => {
                                            window.open(gmail, '_blank');
                                        }, 500);
                                    }}
                                >
                                    {button?.label}
                                </a>
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <PhoneCopyButton />
                            </div>
                        </div>
                    </div>

                    <div onClick={handleBuiltByClick} className='ai-contact-git-section'>
                        <div>{designAndBuiltBy}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

Contact.propTypes = {}

export default Contact