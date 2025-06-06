import { numProps, CubeProps } from "@/types/projectTypes"
import { useBox } from "@react-three/cannon"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh, Vector3 } from "three"
import { useGyroOrientation } from "@/hooks/useGyroOrientation"

const THRESHOLD = 10
const MOVEMENT_SPEED = 3
const DAMPING = 0.95

export default function CubeMobile({ position: initialPosition }: CubeProps) {
    const { nodes } = useGLTF('assets/models/cubeWM.glb')
    const orientation = useGyroOrientation()
    const velocity = useRef(new Vector3(0, 0, 0))
    
    const [ref, api] = useBox<Mesh>(() => ({
        mass: 1,
        position: initialPosition,
        args: [1, 1, 1],
        material: {
            friction: 0.4,
            restitution: 0.2,
        },
    }))
    
    useFrame(() => {
        if (!orientation.beta || !orientation.gamma) return
        
        const beta = orientation.beta
        const gamma = orientation.gamma
        
        const magnitude = Math.sqrt(beta * beta + gamma * gamma)
        
        if (magnitude > THRESHOLD) {
            const normalizedBeta = beta / magnitude
            const normalizedGamma = gamma / magnitude
            
            velocity.current.x = normalizedGamma * MOVEMENT_SPEED
            velocity.current.z = normalizedBeta * MOVEMENT_SPEED
        } else {
            velocity.current.x *= DAMPING
            velocity.current.z *= DAMPING
        }
        
        api.velocity.set(velocity.current.x, 0, velocity.current.z)
    })
    
    const nodePlates: string[] = [
        '1pad',
        '2pad',
        '3pad',
        '4pad',
        '5pad',
        'nullPad',
        'innerQB'
    ]

    const nodeNumbers: numProps[] = [
        {name: '1flat', color: '#0d88ad'},
        {name: '2flat', color: '#ada10d'},
        {name: '3flat', color: '#8d2997'},
        {name: '4flat', color: '#27c103'},
        {name: '5flat', color: '#021419'},
    ]
    
    return (
        <group ref={ref}>
            {nodes['Telo'] && 'geometry' in nodes['Telo'] && (
                <mesh
                    geometry={(nodes['Telo'] as Mesh).geometry}
                    castShadow
                    receiveShadow
                    scale={[0.01, 0.01, 0.01]}
                >
                    <meshStandardMaterial color={'#505050'} roughness={0.4} metalness={0.1} />
                </mesh>
            )}
            
            {nodePlates.map((name) => {
                const node = nodes[name]
                if (!node || !('geometry' in node)) return null
                
                return (
                    <mesh
                        key={name}
                        geometry={(node as Mesh).geometry}
                        castShadow
                        receiveShadow
                        scale={[0.01, 0.01, 0.01]}
                    >
                        <meshStandardMaterial color={'#8c8c8c'} />
                    </mesh>
                )
            })}

            {nodeNumbers.map((num) => {
                const node = nodes[num.name]
                if (!node || !('geometry' in node)) return null
                
                return (
                    <mesh
                        key={num.name}
                        geometry={(node as Mesh).geometry}
                        castShadow
                        receiveShadow
                        scale={[0.01, 0.01, 0.01]}
                    >
                        <meshStandardMaterial color={num.color} />
                    </mesh>
                )
            })}
        </group>        
    )
}