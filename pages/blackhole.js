import dynamic from 'next/dynamic';

const BlackHoleCanvas = dynamic(() => import('../components/BlackHoleCanvas'), { ssr: false });

export default function BlackHolePage() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000', margin: 0, padding: 0, overflow: 'hidden' }}>
            <BlackHoleCanvas />
        </div>
    );
}
