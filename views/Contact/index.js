import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParallax } from 'react-scroll-parallax';
import Star from '../../components/SVGs/Star';
import GitFork from '../../components/SVGs/GitFork';

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

    const [formStatus, setFormStatus] = useState({
        loading: false,
        success: false,
        error: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: '' });

        const formData = new FormData(e.target);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setFormStatus({ loading: false, success: true, error: '' });
                e.target.reset();
                setTimeout(() => {
                    setFormStatus({ loading: false, success: false, error: '' });
                }, 5000);
            } else {
                setFormStatus({ 
                    loading: false, 
                    success: false, 
                    error: data.message || 'Failed to send message. Please try again.' 
                });
            }
        } catch (error) {
            setFormStatus({ 
                loading: false, 
                success: false, 
                error: 'Failed to send message. Please try again.' 
            });
        }
    };

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
            <div className='ai-contact-box'>
                <div className='container'>
                    <div className='ai-contact-content-wrapper'>
                        {/* Left Side - Info */}
                        <div className='ai-contact-info'>
                            <div className='ai-contact-label'>{label}</div>
                            <div className='ai-contact-title'>{heading}</div>
                            <div className='ai-contact-text'>{description}</div>
                            <div className='ai-contact-button'>
                                <button onClick={button?.onClick} className='ai-button'>
                                    {button?.label}
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className='ai-contact-form-wrapper'>
                            <form onSubmit={handleSubmit} className='ai-contact-form' id='contact-form'>
                                <input 
                                    type='hidden' 
                                    name='access_key' 
                                    value='481708d1-d17b-455a-a567-34ddf76a5fed' 
                                />
                                <input 
                                    type='hidden' 
                                    name='subject' 
                                    value='New Contact Form Submission from Portfolio' 
                                />
                                <input 
                                    type='hidden' 
                                    name='from_name' 
                                    value='Portfolio Contact Form' 
                                />
                                
                                <div className='ai-form-group'>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='Full Name *'
                                        required
                                        className='ai-form-input'
                                    />
                                </div>
                                <div className='ai-form-group'>
                                    <input
                                        type='email'
                                        name='email'
                                        placeholder='Email Address *'
                                        required
                                        className='ai-form-input'
                                    />
                                </div>
                                <div className='ai-form-group'>
                                    <input
                                        type='tel'
                                        name='phone'
                                        placeholder='Phone Number (Optional)'
                                        className='ai-form-input'
                                    />
                                </div>
                                <div className='ai-form-group'>
                                    <textarea
                                        name='message'
                                        placeholder='Your Message *'
                                        required
                                        rows='5'
                                        className='ai-form-input ai-form-textarea'
                                    />
                                </div>

                                {formStatus.error && (
                                    <div className='ai-form-error'>
                                        {formStatus.error}
                                    </div>
                                )}

                                {formStatus.success && (
                                    <div className='ai-form-success'>
                                        Message sent successfully! I'll get back to you soon.
                                    </div>
                                )}

                                <button
                                    type='submit'
                                    disabled={formStatus.loading}
                                    className='ai-button ai-form-submit'
                                >
                                    {formStatus.loading ? (
                                        <>
                                            <span className='ai-form-spinner'></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='currentColor' viewBox="0 0 548.244 548.244">
                                                <path fillRule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clipRule="evenodd" />
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div onClick={handleBuiltByClick} className='ai-contact-git-section'>
                        <div>{designAndBuiltBy}</div>
                        {!!(githubInfo.stars && githubInfo.forks) && (
                            <div>
                                <span>
                                    <Star />
                                    <>{' '}{githubInfo.stars.toLocaleString()}</>
                                </span>
                                {' '}
                                <span>
                                    <GitFork />
                                    <>{' '}{githubInfo.forks.toLocaleString()}</>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

Contact.propTypes = {}

export default Contact