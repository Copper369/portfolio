import React from 'react'
import PropTypes from 'prop-types'
import WindowScreen from '../../components/WindowScreen'
import HoverImage from '../../components/HoverImage'
import ViewsTitle from '../../components/ViewsTitle';

const WindowImage = ({ src, link }) => (
    <div 
        onClick={() => link && window.open(link, '_blank')}
        style={{ cursor: link ? 'pointer' : 'default' }}
    >
        <HoverImage
            showFilter
            imageClassName='ai-image'
            src={src}
        />
    </div>
)

const getSide = (index) => index % 2 ? 'left' : 'right'

const SingleProject = (props) => {
    const { image, index, link } = props
    const side = getSide(index);
    return (
        <div className='ai-projects-single'>
            <div className='row'>
                <div className='col-6 d-none d-lg-block'>
                    <div className=''>
                        <WindowScreen containerClassName={`ai-projects-image-container ai-projects-image-container-${side}`}>
                            <WindowImage src={image} link={link} />
                        </WindowScreen>
                    </div>
                </div>
                <div className={`col-12 col-lg-6 d-flex align-items-center ${side === 'right' ? 'order-first' : ''}`}>
                    <ProjectTextSide {...props} />
                </div>
            </div>
        </div>
    )
}

const ProjectTextSide = (props) => {
    const { label, title, description, techs, index, image, link } = props
    const side = getSide(index);
    return (
        <div
            data-aos={`fade-down-${side}`}
            className={`ai-projects-text-side ai-projects-text-side-${side}`}>
            <div
                data-aos={`zoom-in-${side}`}
                className='ai-projects-text-featured'>{label}</div>
            <div
                data-aos={`zoom-in-${side}`}
                className='ai-projects-text-title'>{title}</div>
            <div
                data-aos={`zoom-in-${side}`}
                className='ai-projects-text-description'>
                {description}
                <div className='mt-4 d-block d-lg-none'>
                    <WindowScreen containerClassName={`ai-text-image-container`}>
                        <WindowImage src={image} link={link} />
                    </WindowScreen>
                </div>
            </div>
            <div
                data-aos={`zoom-in-${side}`}
                className='ai-projects-text-tecs'>
                {techs.map((tech, i) => `${tech} ${techs.length - 1 !== i ? ' | ' : ''}`)}
            </div>
            {link && (
                <div
                    data-aos={`zoom-in-${side}`}
                    className='ai-projects-live-btn-container'>
                    <button 
                        className='ai-projects-live-btn'
                        onClick={() => window.open(link, '_blank')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                            <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                        VIEW LIVE PROJECT
                    </button>
                </div>
            )}
        </div>
    )
}

const MiniProjectCard = ({ title, subtitle, description, image, index, link }) => {
    return (
        <div 
            className="ai-fancy-card"
            data-aos="fade-up"
            data-aos-delay={index * 50}
        >
            {/* Mac Window Controls */}
            <div className="ai-mac-controls">
                <span className="ai-mac-btn ai-mac-red"></span>
                <span className="ai-mac-btn ai-mac-yellow"></span>
                <span className="ai-mac-btn ai-mac-green"></span>
            </div>

            {/* Decorative Star */}
            <div className="ai-fancy-star">
                <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="1" fill="none" viewBox="0 0 24 24" height="200" width="200" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
            </div>

            {/* Circular Background */}
            <div className="ai-fancy-circle"></div>

            {/* Badge */}
            <div className="ai-fancy-badge">
                <p className="ai-fancy-badge-text">{subtitle}</p>
            </div>

            {/* Project Image */}
            <div className="ai-fancy-img">
                {image && <img src={image} alt={title} />}
            </div>

            {/* Project Info */}
            <div className="ai-fancy-info">
                <h3 className="ai-fancy-title">{title}</h3>
                <p className="ai-fancy-description">{description}</p>
            </div>

            {/* Action Button */}
            {link && (
                <div className="ai-fancy-action">
                    <button 
                        className="ai-fancy-btn"
                        onClick={() => window.open(link, '_blank')}
                    >
                        VIEW LIVE
                    </button>
                </div>
            )}
        </div>
    )
}

const Projects = ({ data: {
    heading,
    list,
    miniProjects
} }) => {
    return (
        <div className='ai-projects'>
            <div className='container'>
                <div className='ai-projects-container'>
                    <ViewsTitle text={heading} />
                    <div className='row justify-content-center'>
                        {(list || []).map((project, i) => (
                            <SingleProject
                                key={i}
                                index={i}
                                {...project}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mini Projects Grid Section */}
            {miniProjects && (
                <div className='ai-mini-projects-section'>
                    <div className='container'>
                        <div className='ai-mini-projects-container'>
                            <ViewsTitle text={miniProjects.heading} />
                            <div className='ai-mini-projects-grid'>
                                {miniProjects.list.map((project, i) => (
                                    <MiniProjectCard 
                                        key={i}
                                        index={i}
                                        {...project}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

Projects.propTypes = {}

export default Projects
