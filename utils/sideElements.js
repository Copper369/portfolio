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
        onClick: () => openLink('mailto:ayushkarnewar369@gmail.com?subject=Hello')
    },
    handleIconClick,
}

export default sideElements