// components/uis/overlay/GyroPermissionDialog
interface GyroPermissionDialogProps {
  onPermissionGranted: () => void
}

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>
}

export default function GyroPermissionDialog({ onPermissionGranted }: GyroPermissionDialogProps) {
  const requestPermission = async () => {
    const DeviceOrientationEventTyped = DeviceOrientationEvent as DeviceOrientationEventWithPermission
    
    if (typeof DeviceOrientationEventTyped.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEventTyped.requestPermission()
        if (permission === 'granted') {
          onPermissionGranted()
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error)
      }
    } else {
      onPermissionGranted()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-primary-light dark:bg-primary-dark text-txts-dark dark:text-txts-light p-8 rounded-lg max-w-sm mx-4">
        <h2 className="text-xl font-bold mb-4">Povolení gyroskopu</h2>
        <p className="mb-6">Pro ovládání kostičky potřebujeme přístup k orientaci zařízení.</p>
        <button
          onClick={requestPermission}
          className="w-full bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Povolit gyroskop
        </button>
      </div>
    </div>
  )
}