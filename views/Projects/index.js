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
                    className='ai-projects-text-link'>
                    <a href={link} target="_blank" rel="noopener noreferrer" className='ai-button'>
                        View Live Project →
                    </a>
                </div>
            )}
        </div>
    )
}

const MiniProjectCard = ({ title, subtitle, description, image, index }) => {
    return (
        <div 
            className="ai-mini-project-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <div className="ai-mini-project-tools">
                <div className="ai-mini-project-circle">
                    <span className="ai-mini-project-red ai-mini-project-box"></span>
                </div>
                <div className="ai-mini-project-circle">
                    <span className="ai-mini-project-yellow ai-mini-project-box"></span>
                </div>
                <div className="ai-mini-project-circle">
                    <span className="ai-mini-project-green ai-mini-project-box"></span>
                </div>
            </div>
            
            <div className="ai-mini-project-content">
                <div className="ai-mini-project-image">
                    {image && <img src={image} alt={title} />}
                </div>
                
                <div className="ai-mini-project-meta">
                    <span>Project</span>
                    <span>2024</span>
                </div>
                
                <div className="ai-mini-project-title">{title}</div>
                <div className="ai-mini-project-subtitle">{subtitle}</div>
                <div className="ai-mini-project-description">{description}</div>
            </div>
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
