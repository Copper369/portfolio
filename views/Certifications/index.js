import React from 'react'
import PropTypes from 'prop-types'
import ViewsTitle from '../../components/ViewsTitle'
import Share from '../../components/SVGs/Share'

const SingleItem = ({ logo, title, link, date, platform, handleIconClick }) => (
    <div className='ai-cert-card'>
        <div className='ai-item-body p-4'>
            <div className='ai-item-head'>
                <div
                    style={{
                        backgroundImage: `url(${logo})`,
                    }}
                    className='ai-item-logo'>
                </div>
                <div className='ai-item-share'>
                    {link && (
                        <Share onClick={() => handleIconClick(link)} key="share" width={22} height={22} />
                    )}
                </div>
            </div>
            <div className='flex-1'>
                <div className='ai-item-title'>{title}</div>
                <div className='ai-item-platform'>{platform}</div>
            </div>
            <div className='ai-item-date'>{date}</div>
        </div>
    </div>
)

const Certifications = ({ data: {
    heading,
    list,
    handleIconClick
} }) => {
    return (
        <div className='ai-certifications'>
            <div className='container-fluid'>
                <div className='ai-certifications-top-background' />
                <div className='ai-certifications-container'>
                    <div className='ai-certifications-header'>
                        <ViewsTitle text={heading} />
                        <div className='ai-scroll-hint'>← Scroll horizontally →</div>
                    </div>
                    <div className='ai-cert-horizontal-scroll'>
                        <div className='ai-cert-cards-wrapper'>
                            {(list || []).map((item, i) => (
                                <SingleItem 
                                    key={i} 
                                    {...item} 
                                    handleIconClick={handleIconClick} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Certifications.propTypes = {}

export default Certifications
