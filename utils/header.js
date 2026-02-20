import { openLink, scrollTo } from "./methods";


const header = {
    menus: [
        { title: 'Home', id: 'home' },
        { title: 'About', id: 'my-self' },
        { title: 'Experience', id: 'experience' },
        { title: 'Projects', id: 'my-work' },
        { title: 'Competitions', id: 'reviews' },
        { title: 'Certifications', id: 'certifications' },
        // { title: 'Contribution', id: 'contributions' },
        { title: 'Contact', id: 'contact' },
    ],
    rightBtn: {
        label: 'Resume',
        onClick: () => openLink('assets/cv.pdf')
    },
    logo: {
        src: '/assets/profile.jpg',
        alt: 'ayushkarnewar'
    },
    handleIconClick: () => scrollTo('home'),
    handleItemSelect: (menu) => scrollTo(menu.id),
}

export default header