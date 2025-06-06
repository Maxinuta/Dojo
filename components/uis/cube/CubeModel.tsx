import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect, useCallback } from "react";
import { Vector3, Mesh, Raycaster, Plane } from 'three'
import { useThree, useFrame, ThreeEvent } from "@react-three/fiber";
import { numProps, CubeProps } from "@/types/projectTypes";

interface dragInfo {
  isDragging: boolean
  offset: Vector3
  startPosition: Vector3
  lastVelocity: Vector3
}


export default function CubeModel({ position: initialPosition }: CubeProps) {
    const { nodes } = useGLTF('assets/models/cubeWM.glb')
    const { camera, mouse } = useThree()
    const [ref, api] = useBox<Mesh>(() => ({
        mass: 1,
        position: initialPosition,
        args: [1, 1, 1],
        material: {
          friction: 0.4,
          restitution: 0.2,
        },
    }))

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

    const [dragInfo, setDragInfo] = useState<dragInfo>({
        isDragging: false,
        offset: new Vector3(),
        startPosition: new Vector3(),
        lastVelocity: new Vector3()
    })

    const raycaster = useRef(new Raycaster())
    const dragPlane = useRef(new Plane(new Vector3(0, 1, 0), 0))
    const intersection = useRef(new Vector3())
    const lastPosition = useRef(new Vector3())
    const velocities = useRef<Vector3[]>([])
    const currentPosition = useRef(new Vector3())
    
    useEffect(() => {
        const unsubscribe = api.position.subscribe((pos) => {
            currentPosition.current.set(pos[0], pos[1], pos[2])
        })
        return unsubscribe
    }, [api.position])

    useFrame(() => {
        if (dragInfo.isDragging) {
            raycaster.current.setFromCamera(mouse, camera)
            if (raycaster.current.ray.intersectPlane(dragPlane.current, intersection.current)) {
                const newPos = intersection.current.clone().add(dragInfo.offset)
                const velocity = newPos.clone().sub(lastPosition.current)

                velocities.current.push(velocity.clone())
                
                if (velocities.current.length > 5) {
                    velocities.current.shift()
                }
                
                lastPosition.current.copy(newPos)
                
                api.position.set(newPos.x, newPos.y, newPos.z)
            }
        }
    })

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        
        const currentPos = currentPosition.current.clone()
        const planeHeight = currentPos.y + 0.5
        dragPlane.current.set(new Vector3(0, 1, 0), -planeHeight)
        
        raycaster.current.setFromCamera(mouse, camera)
        if (raycaster.current.ray.intersectPlane(dragPlane.current, intersection.current)) {
            const offset = new Vector3(
                currentPos.x - intersection.current.x,
                planeHeight - intersection.current.y,
                currentPos.z - intersection.current.z
            )
            
            api.mass.set(0)
            api.position.set(currentPos.x, planeHeight, currentPos.z)
            api.velocity.set(0, 0, 0)
            api.angularVelocity.set(0, 0, 0)
            
            velocities.current = []
            lastPosition.current.set(currentPos.x, planeHeight, currentPos.z)
            
            setDragInfo({
                isDragging: true,
                offset: offset,
                startPosition: currentPos.clone(),
                lastVelocity: new Vector3()
            })
        }
    }

    const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent> | { stopPropagation: () => void }) => {
        if (dragInfo.isDragging) {
            e.stopPropagation()
            
            api.mass.set(1)
            const avgVelocity = new Vector3()
            if (velocities.current.length > 0) {
                velocities.current.forEach(v => avgVelocity.add(v))
                avgVelocity.divideScalar(velocities.current.length)
            }
            
            const throwForce = avgVelocity.multiplyScalar(30)
            const spinForce = new Vector3(
                -throwForce.z * 0.5 + (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 10,
                throwForce.x * 0.5 + (Math.random() - 0.5) * 5
            )
            
            api.velocity.set(throwForce.x, throwForce.y, throwForce.z)
            api.angularVelocity.set(spinForce.x, spinForce.y, spinForce.z)
            
            setDragInfo({
                isDragging: false,
                offset: new Vector3(),
                startPosition: new Vector3(),
                lastVelocity: new Vector3()
            })
        }
    }, [dragInfo.isDragging, api])
    
    useEffect(() => {
        const handleGlobalPointerUp = () => {
            if (dragInfo.isDragging) {
                handlePointerUp({ stopPropagation: () => {} })
            }
        }
        
        window.addEventListener('pointerup', handleGlobalPointerUp)
        return () => window.removeEventListener('pointerup', handleGlobalPointerUp)
    }, [dragInfo.isDragging, handlePointerUp])
    
    return (
        <group
            ref={ref}
            onPointerDown={handlePointerDown}
        >
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
                        <meshStandardMaterial color={num.color} emissive={num.color} emissiveIntensity={4} />
                    </mesh>
                )
            })}
        </group>
    )
}