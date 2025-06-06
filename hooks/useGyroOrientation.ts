import { useEffect, useState } from 'react'

interface GyroOrientationData {
  alpha: number | null
  beta: number | null
  gamma: number | null
}

export function useGyroOrientation() {
  const [orientation, setOrientation] = useState<GyroOrientationData>({
    alpha: null,
    beta: null,
    gamma: null,
  })

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      })
    }

    window.addEventListener('deviceorientation', handleOrientation)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return orientation
}