import { openLink } from "./methods"

const handleIconClick = (icon) => {
    const links = {
        'github': 'https://github.com/Copper369/',
        'instagram': 'https://www.instagram.com/ayush.apk_?igsh=YWVwajlqcGxxNTJy',
        'twitter': 'https://x.com/copperrr369',
        'linkedin': 'https://www.linkedin.com/in/ayush-karnewar-016460289/',
    }
    openLink(links[icon])
}

const sideElements = {
    emailButton: {
        label: 'ayushkarnewar369@gmail.com',
        onClick: () => { window.location.href = 'mailto:ayushkarnewar369@gmail.com?subject=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D' }
    },
    phoneButton: {
        label: '+91 9960670950',
        onClick: () => { window.location.href = 'tel:+919960670950' }
    },
    handleIconClick,
}

export default sideElements