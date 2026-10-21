import { OrbitControls, Center } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { Model } from "./desktop";

const Desktop = () => {
    const desktopRef = useRef();

    useFrame((state) => {
        if (!desktopRef.current) return;

        // Subtle mouse tracking matching interactive feel
        const targetX = 0.05 - state.mouse.y * 0.15;
        const targetY = state.mouse.x * 0.3;

        desktopRef.current.rotation.x +=
            (targetX - desktopRef.current.rotation.x) * 0.04;

        desktopRef.current.rotation.y +=
            (targetY - desktopRef.current.rotation.y) * 0.04;

        // Floating animation
        desktopRef.current.position.y =
            -0.5 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
    });

    return (
        <group
            ref={desktopRef}
            scale={2.8}
            position={[0, -0.5, 0]}
        >
            <Center>
                <Model />
            </Center>
        </group>
    );
};

const CarModel = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 14], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                powerPreference: "high-performance",
                alpha: true,
            }}
        >
            {/* Ambient Fill */}
            <ambientLight
                intensity={0.9}
                color="#ffffff"
            />

            {/* Top Light */}
            <directionalLight
                position={[0, 6, 4]}
                intensity={1.8}
                color="#ffffff"
            />

            {/* Front Key Light */}
            <directionalLight
                position={[0, 1, 12]}
                intensity={2.2}
                color="#ffffff"
            />

            {/* Side Rim Light */}
            <directionalLight
                position={[8, 3, 5]}
                intensity={1.0}
                color="#00d4ff"
            />

            {/* Left Fill Light */}
            <directionalLight
                position={[-8, 2, 5]}
                intensity={0.8}
                color="#80d0ff"
            />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
            />

            <Desktop />
        </Canvas>
    );
};

export default CarModel;