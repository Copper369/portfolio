import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ResearchTimeline = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className='ai-research-timeline'>
            <div className='container'>
                <div className='research-title' data-aos="fade-up">
                    <h2>Research Works</h2>
                    <p className='subtitle'>Exploring the frontiers of science and technology</p>
                </div>
                
                <div className='timeline-container'>
                    {/* Animated connecting line */}
                    <div className='timeline-line'>
                        <div className='timeline-progress'></div>
                    </div>

                    {/* Timeline nodes */}
                    <div className='timeline-nodes'>
                        {data.map((paper, index) => (
                            <div 
                                key={index}
                                className='timeline-item'
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                            >
                                {/* Node circle */}
                                <div 
                                    className={`timeline-node ${activeIndex === index ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    <div className='node-inner'>
                                        <span className='node-number'>{index + 1}</span>
                                    </div>
                                    <div className='node-pulse'></div>
                                </div>

                                {/* Year/Date label */}
                                <div className='timeline-date'>
                                    {paper.year || '2024'}
                                </div>

                                {/* Expanded card */}
                                <div className={`timeline-card ${activeIndex === index ? 'expanded' : ''}`}>
                                    <div className='card-content'>
                                        <div className='card-image'>
                                            <img src={paper.image} alt={paper.title} />
                                            <div className='image-overlay'></div>
                                        </div>
                                        <div className='card-details'>
                                            <h3>{paper.title}</h3>
                                            <p>{paper.description}</p>
                                            <div className='card-footer'>
                                                <a 
                                                    href={paper.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className='view-paper-btn'
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span>View Paper</span>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

ResearchTimeline.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        year: PropTypes.string
    })).isRequired
}

export default ResearchTimeline
