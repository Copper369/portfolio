import { openLink } from "./methods"

const contact = {
    label: `Get in touch`,
    heading: `Let's Connect`,
    description: `I'm always open to discussing new projects, innovative ideas, or opportunities to be part of your vision. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!`,
    button: {
        label: 'Say Hello',
        onClick: () => openLink('mailto:ayushkarnewar369@gmail.com?subject=Hello')
    },
    designAndBuiltBy: 'Portfolio by Ayush Karnewar',
    handleBuiltByClick: () => openLink('https://linkedin.com/in/ayush-karnewar-016460289')
}

export default contact
