import React from 'react'
import PropTypes from 'prop-types'
import ViewsTitle from '../../components/ViewsTitle';

const EventCard = ({ title, subtitle, image }) => {
    return (
        <div className="ai-event-card">
            <div className="ai-event-card-image">
                <img src={image} alt={title} />
                <div className="ai-event-card-overlay"></div>
            </div>
            <div className="ai-event-card-content">
                <h3 className="ai-event-card-title">{title}</h3>
                <p className="ai-event-card-subtitle">{subtitle}</p>
            </div>
        </div>
    )
}

const Reviews = ({ data: {
    heading,
    list
} }) => {
    // Duplicate the list for seamless infinite scroll
    const duplicatedList = [...list, ...list];

    return (
        <div className='ai-reviews'>
            <div className='container'>
                <div className='ai-reviews-container'>
                    <ViewsTitle
                        text={heading}
                    />
                </div>
            </div>
            <div className='ai-events-marquee-wrapper'>
                <div className='ai-events-marquee'>
                    {duplicatedList.map((item, i) => (
                        <EventCard 
                            key={i}
                            title={item.title}
                            subtitle={item.subtitle}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

Reviews.propTypes = {}

export default Reviews
