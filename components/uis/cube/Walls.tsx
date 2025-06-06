import { usePlane } from '@react-three/cannon'
import { useThree } from '@react-three/fiber'

export default function Walls() {
  const { viewport } = useThree()
  const wallHeight = 5
  const halfWidth = viewport.width / 2
  const halfHeight = viewport.height / 2

  usePlane(() => ({
    position: [-halfWidth, wallHeight / 2, 0],
    rotation: [0, Math.PI / 2, 0],
    args: [viewport.height, wallHeight],
    type: 'Static',
  }))

  usePlane(() => ({
    position: [halfWidth, wallHeight / 2, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [viewport.height, wallHeight],
    type: 'Static',
  }))

  usePlane(() => ({
    position: [0, wallHeight / 2, -halfHeight],
    rotation: [0, 0, 0],
    args: [viewport.width, wallHeight],
    type: 'Static',
  }))

  usePlane(() => ({
    position: [0, wallHeight / 2, halfHeight],
    rotation: [0, Math.PI, 0],
    args: [viewport.width, wallHeight],
    type: 'Static',
  }))

  return null
}