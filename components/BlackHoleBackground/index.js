import { useEffect, useState } from 'react';

const BlackHoleBackground = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const hero = document.getElementById('home');
            if (hero) {
                setVisible(hero.getBoundingClientRect().bottom < 100);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <iframe
            src="/blackhole"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                border: 'none',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: visible ? 0.35 : 0,
                transition: 'opacity 1s ease',
            }}
            title="blackhole"
        />
    );
};

export default BlackHoleBackground;
