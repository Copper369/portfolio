import { openLink } from "./methods"

const contact = {
    label: `Get in touch`,
    heading: `Let's Connect`,
    description: `I'm always open to discussing new projects, innovative ideas, or opportunities to be part of your vision. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!`,
    button: {
        label: 'Say Hello',
        onClick: () => { window.location.href = 'mailto:ayushkarnewar369@gmail.com?subject=Hey%20Ayush!%20Happy%20to%20Connect!&body=Hey%20Ayush!%0A%0AHappy%20to%20connect!%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20get%20in%20touch.%0A%0A%5BYour%20message%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D' }
    },
    designAndBuiltBy: 'Keep Smiling 😊',
    handleBuiltByClick: () => openLink('https://linkedin.com/in/ayush-karnewar-016460289')
}

export default contact
