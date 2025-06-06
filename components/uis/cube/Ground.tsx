import { usePlane } from '@react-three/cannon'
import { useThree } from '@react-three/fiber'
import { Mesh } from 'three'
import { useTheme } from 'next-themes'

export default function Ground() {
  const { theme } = useTheme()
  const color = theme === 'light' ? '#f8f9fa' : '#0d0d0d'
  const { viewport } = useThree()
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: {
      friction: 0.6,
      restitution: 0.1,
    },
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}