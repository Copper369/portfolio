

import React from 'react'
import GitHub from '../SVGs/GitHub'
import Instagram from '../SVGs/Instagram'
import LinkedIn from '../SVGs/LinkedIn'
import Twitter from '../SVGs/Twitter'

const SideElementsItem = ({ items, position }) => {
    return (
        <div className={`ai-side-elements-container ai-side-elements-${position}`} >
            {(items || []).map((item, i) => (
                <div key={i} className='ai-side-elements-item'>
                    {item}
                </div>
            ))}
            <div className='ai-side-elements-line' />
        </div>
    )
}


const SideElements = ({ data: {
    emailButton,
    handleIconClick,
} }) => {
    return (
        <div className='ai-side-elements'>
            {/* left side  */}
            <SideElementsItem
                position="left"
                items={[
                    <GitHub onClick={() => handleIconClick('github')} key="GitHub" width={20} height={20} />,
                    <Instagram onClick={() => handleIconClick('instagram')} key="Instagram" width={20} height={20} />,
                    <Twitter onClick={() => handleIconClick('twitter')} key="Twitter" width={20} height={20} />,
                    <LinkedIn onClick={() => handleIconClick('linkedin')} key="LinkedIn" width={20} height={20} />,
                ]}
            />

            {/* right side  */}
            <SideElementsItem
                position="right"
                items={[
                    <a
                        href="mailto:ayushkarnewar369@gmail.com?subject=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
                        key="website"
                        className='ai-side-elements-text'
                        style={{ textDecoration: 'none' }}
                        onClick={(e) => {
                            e.preventDefault();
                            const mailto = 'mailto:ayushkarnewar369@gmail.com?subject=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D';
                            const gmail = 'https://mail.google.com/mail/?view=cm&to=ayushkarnewar369@gmail.com&su=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D';
                            window.open(mailto, '_self');
                            setTimeout(() => {
                                window.open(gmail, '_blank');
                            }, 500);
                        }}
                    >
                        {emailButton?.label}
                    </a>,
                ]}
            />
        </div>
    )
}

SideElements.propTypes = {}

export default SideElements