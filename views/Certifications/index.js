import React, { useState } from 'react'
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
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Extract unique platforms for filters
    const platforms = ['All', ...new Set(list?.map(item => {
        if (item.platform.includes('Google')) return 'Google';
        if (item.platform.includes('AWS') || item.platform.includes('aws')) return 'AWS';
        if (item.platform.includes('Cisco')) return 'Cisco';
        if (item.platform.includes('NVIDIA')) return 'NVIDIA';
        if (item.platform.includes('ISRO')) return 'ISRO';
        return 'Others';
    }))];
    
    // Filter certificates based on active filter
    const filteredList = activeFilter === 'All' 
        ? list 
        : list?.filter(item => {
            if (activeFilter === 'Google') return item.platform.includes('Google');
            if (activeFilter === 'AWS') return item.platform.includes('AWS') || item.platform.includes('aws');
            if (activeFilter === 'Cisco') return item.platform.includes('Cisco');
            if (activeFilter === 'NVIDIA') return item.platform.includes('NVIDIA');
            if (activeFilter === 'ISRO') return item.platform.includes('ISRO');
            if (activeFilter === 'Others') {
                return !item.platform.includes('Google') && 
                       !item.platform.includes('AWS') && 
                       !item.platform.includes('aws') &&
                       !item.platform.includes('Cisco') && 
                       !item.platform.includes('NVIDIA') && 
                       !item.platform.includes('ISRO');
            }
            return true;
        });
    
    return (
        <div className='ai-certifications'>
            <div className='container-fluid'>
                <div className='ai-certifications-top-background' />
                <div className='ai-certifications-container'>
                    <div className='ai-certifications-header'>
                        <ViewsTitle text={heading} />
                        
                        {/* Filter Tabs */}
                        <div className='ai-cert-filters'>
                            {platforms.map(platform => (
                                <button
                                    key={platform}
                                    className={`ai-filter-btn ${activeFilter === platform ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(platform)}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Masonry Grid */}
                    <div className='ai-cert-masonry-grid'>
                        {filteredList?.map((item, i) => (
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
    )
}

Certifications.propTypes = {}

export default Certifications
