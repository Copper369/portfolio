import React, { useRef, useMemo } from 'react';
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
    const meshRef = useRef();
    const count = 20000;
    const speedMult = 1;
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const target = useMemo(() => new THREE.Vector3(), []);
    const pColor = useMemo(() => new THREE.Color(), []);
    const color = pColor;

    const positions = useMemo(() => {
        const pos = [];
        for (let i = 0; i < count; i++)
            pos.push(new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100));
        return pos;
    }, []);

    const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
    const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);
    const PARAMS = useMemo(() => ({ radius: 42, fate: 0.09, shock: 2, pspin: 6 }), []);
    const addControl = (id, l, min, max, val) => PARAMS[id] !== undefined ? PARAMS[id] : val;
    const setInfo = () => {};
    const annotate = () => {};

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime() * speedMult;
        if (material.uniforms && material.uniforms.uTime) material.uniforms.uTime.value = time;

        for (let i = 0; i < count; i++) {
            const gR = addControl("radius", "Star Radius", 20, 60, 42);
            const fate = addControl("fate", "Collapse Speed", 0.04, 0.2, 0.09);
            const shock = addControl("shock", "Shock Power", 0.5, 4, 2.0);
            const pSpin = addControl("pspin", "Pulsar Spin", 1, 12, 6);
            const PI = Math.PI;
            const TAU = PI * 2;
            const n = i / count;
            const t = time;
            const phase = (t * fate) % 1.0;
            const rC = Math.max(0, Math.min(1, (phase - 0.22) / 0.15));
            const rB = Math.max(0, Math.min(1, (phase - 0.37) / 0.08));
            const rE = Math.max(0, Math.min(1, (phase - 0.45) / 0.55));
            const sC = rC * rC * (3 - 2 * rC);
            const sB = rB * rB * (3 - 2 * rB);
            const sE = rE * rE * (3 - 2 * rE);
            const sd1 = (i * 1.618034) % 1;
            const sd2 = (i * 2.718281) % 1;
            const sd3 = (i * 0.7071068) % 1;

            if (n < 0.05) {
                const vi = n / 0.05;
                const ga = 2.399963 * i;
                const phi = Math.acos(1 - 2 * vi);
                const coreR = gR * 0.12 * (1 - sC * 0.93) + sB * 0.3;
                const spinUp = 0.2 + sC * pSpin * 8;
                const rot = ga + t * spinUp;
                const boil = (1 - sC) * Math.sin(t * 6 + vi * 40) * 1.2;
                const r = Math.max(0.1, coreR + boil);
                target.set(r * Math.sin(phi) * Math.cos(rot), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(rot));
                color.setHSL(0.12 * (1 - sC), 0.2 + 0.7 * sC, 0.6 + 0.38 * sC);
            } else if (n < 0.18) {
                const vi = (n - 0.05) / 0.13;
                const shellN = vi * 5;
                const shellI = Math.floor(shellN);
                const shellF = shellN - shellI;
                const shellR0 = gR * (0.15 + shellI * 0.14);
                const pulse = Math.sin(t * 2.5 + shellI * 1.2) * 2 * (1 - sC);
                const preR = shellR0 + pulse;
                const inR = preR * (1 - sC * 0.8);
                const postR = inR + sB * shock * 18 + sE * shock * 55 * Math.pow(rE + 0.01, 0.5);
                const ripple = sB * Math.sin(shellF * 50 + t * 8) * 1.5;
                const ang = shellF * TAU * 6 + t * (0.3 + sC * 1.5);
                const tilt = 0.3 * Math.sin(shellF * 13 + shellI * 2.1);
                const totalR = postR + ripple;
                target.set(Math.cos(ang) * totalR, totalR * tilt + Math.sin(ang) * totalR * 0.15, Math.sin(ang) * totalR);
                const hue = 0.06 + shellI * 0.04 - sB * 0.06;
                const flash = sB * (1 - sE) * 0.4;
                color.setHSL(Math.max(0, hue), 0.75 - sE * 0.2, 0.22 + 0.18 * (1 - vi) + flash);
            } else if (n < 0.50) {
                const vi = (n - 0.18) / 0.32;
                const nTen = 24;
                const tenI = Math.floor(sd1 * nTen);
                const tenAng = (tenI / nTen) * TAU + Math.sin(tenI * 2.3) * 0.5;
                const tenPhi = Math.acos(1 - 2 * ((tenI * 1.618) % 1));
                const envR0 = gR * (0.5 + vi * 0.5);
                const conv = Math.sin(t * 1.5 + sd1 * 20) * 3 + Math.sin(t * 0.7 + sd2 * 15) * 2;
                const preR = envR0 + conv * (1 - sC);
                const cR = preR * (1 - sC * 0.25);
                const fLen = sE * shock * (35 + vi * 55);
                const fWid = (2 + sE * 7 * sd2) * sE;
                const rtW = Math.sin(vi * 80 + t * 3 + tenI) * sE * 4.5;
                const along = sd3 * fLen;
                const sR = cR * (1 - sB * 0.3) + along;
                const dx = Math.sin(tenPhi) * Math.cos(tenAng);
                const dy = Math.cos(tenPhi);
                const dz = Math.sin(tenPhi) * Math.sin(tenAng);
                const px = Math.sin(sd2 * TAU) * fWid;
                const py = Math.cos(sd2 * TAU) * fWid;
                target.set(dx * sR + px + rtW * dy, dy * sR + py + rtW * dx, dz * sR + rtW);
                const hue = (0.02 + 0.03 * Math.sin(sd1 * 10)) * (1 - sE) + (0.0 + vi * 0.08) * sE;
                const lum = (0.38 - vi * 0.12) * (1 - sE * 0.3) + sB * (1 - sE) * 0.3;
                color.setHSL(hue, 0.85 - sE * 0.15, Math.max(0.06, lum));
            } else if (n < 0.58) {
                const vi = (n - 0.50) / 0.08;
                const ga = 2.399963 * i;
                const phi = Math.acos(1 - 2 * vi);
                const nR = sB * (25 + sE * 110);
                const r = Math.max(0.01, nR + (sd1 - 0.5) * 0.8);
                target.set(r * Math.sin(phi) * Math.cos(ga + t * 0.1), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(ga + t * 0.1));
                const fade = Math.max(0, 1 - sE * 0.8);
                const flk = Math.pow(Math.sin(t * 20 + i * 3.7) * 0.5 + 0.5, 3);
                color.setHSL(0.6, 0.5, 0.03 + 0.22 * fade * flk * sB);
            } else if (n < 0.72) {
                const vi = (n - 0.58) / 0.14;
                const side = vi < 0.5 ? 1 : -1;
                const ji = vi < 0.5 ? vi * 2 : (vi - 0.5) * 2;
                const beamOn = sC;
                const beamH = beamOn * (8 + ji * 45);
                const coneR = ji * 3.5 * beamOn;
                const hAngle = ji * TAU * 6 + t * pSpin * 3;
                const rotA = t * pSpin + side * PI;
                const lx = Math.cos(hAngle) * coneR;
                const lz = Math.sin(hAngle) * coneR;
                const rx = lx * Math.cos(rotA) - lz * Math.sin(rotA);
                const rz = lx * Math.sin(rotA) + lz * Math.cos(rotA);
                target.set(rx, side * beamH, rz);
                const lum = (1 - ji * 0.55) * beamOn * 0.65;
                color.setHSL(0.57 + 0.06 * ji, 0.65, Math.max(0.01, lum));
            } else if (n < 0.90) {
                const vi = (n - 0.72) / 0.18;
                const nFil = 16;
                const filI = Math.floor(sd1 * nFil);
                const filAng = (filI / nFil) * TAU + Math.sin(filI * 2.3) * 0.5;
                const filTilt = Math.cos(filI * 1.7) * 0.8;
                const nebR = sE * (18 + vi * 45 + sd2 * 20);
                const drift = Math.sin(t * 0.3 + sd1 * 30) * 3 * sE;
                const curl = Math.sin(vi * 40 + t * 0.5 + filI) * 5 * sE;
                target.set(Math.cos(filAng) * nebR + curl * Math.sin(filTilt), filTilt * nebR * 0.4 + drift, Math.sin(filAng) * nebR + curl * Math.cos(filTilt));
                const nebH = sd1 < 0.33 ? 0.35 : sd1 < 0.66 ? 0.92 : 0.08;
                const lum = 0.12 + 0.18 * sE * (1 - vi * 0.3);
                color.setHSL(nebH, 0.6, Math.max(0.03, lum));
            } else {
                const vi = (n - 0.90) / 0.10;
                const ga = 2.399963 * i;
                const phi = Math.acos(1 - 2 * vi);
                const haloR = gR * 1.4 + sE * 25 + sd1 * 12;
                const flutter = Math.sin(t * 0.8 + i * 0.17) * 2.5;
                const r = haloR + flutter;
                target.set(r * Math.sin(phi) * Math.cos(ga + t * 0.05), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(ga + t * 0.05));
                const pls = Math.pow(Math.sin(t * 1.5 + vi * 20) * 0.5 + 0.5, 4);
                color.setHSL(0.0, 0.35, 0.015 + 0.05 * pls);
            }

            positions[i].lerp(target, 0.1);
            dummy.position.copy(positions[i]);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
            meshRef.current.setColorAt(i, pColor);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

export default function BlackHoleCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 100], fov: 60 }} style={{ width: '100%', height: '100%' }}>
            <fog attach="fog" args={['#000000', 0.01]} />
            <ParticleSwarm />
            <OrbitControls autoRotate={true} />
            <Effects disableGamma>
                <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
            </Effects>
        </Canvas>
    );
}
