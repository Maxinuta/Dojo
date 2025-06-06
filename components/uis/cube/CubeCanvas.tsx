'use client'
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics } from '@react-three/cannon'
import { Suspense, lazy, useState } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import GyroPermissionDialog from "../overlays/GyroPermissionDialog"

const Ground = lazy(() => import('./Ground'))
const Walls = lazy(() => import('./Walls'))
const CubeModel = lazy(() => import('./CubeModel'))
const CubeMobile = lazy(() => import('./CubeMobile'))

function LoadingIndicator() {
    return (
        <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: '#666',
            fontSize: '0.875rem'
        }}>
            Načítání...
        </div>
    )
}

function CubeScene() {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={0.8}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <Physics gravity={[0, -9.81, 0]}>
                <Suspense fallback={null}>
                    <Ground />
                    <Suspense fallback={null}>
                        <Walls />
                        <Suspense fallback={null}>
                            <CubeModel position={[-2, 1, 0]} />
                            <CubeModel position={[2, 1, 0]} />
                        </Suspense>
                    </Suspense>
                </Suspense>
            </Physics>
        </>
    )
}

function CubeMobileScene() {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={0.8}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <Physics gravity={[0, -9.81, 0]}>
                <Suspense fallback={null}>
                    <Ground />
                    <Suspense fallback={null}>
                        <Walls />
                        <Suspense fallback={null}>
                            <CubeMobile position={[0, 1, 0]} />
                        </Suspense>
                    </Suspense>
                </Suspense>
            </Physics>
        </>
    )
}

export default function CubeCanvas() {
    const isMobile = useIsMobile()
    const [mobilePermissionGranted, setMobilePermissionGranted] = useState(false)

    if (isMobile && !mobilePermissionGranted) {
        return <GyroPermissionDialog onPermissionGranted={() => setMobilePermissionGranted(true)} />
    }

    return (
        <Canvas
            shadows
            camera={{ position: [0, 10, 0], fov: 30, near: 0.1, far: 100 }}
        >
            {isMobile ? <CubeMobileScene /> : <CubeScene />}
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
                target={[0, 0, 0]}
            />
        </Canvas>
    )
}