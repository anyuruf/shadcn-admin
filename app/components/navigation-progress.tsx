import { useEffect, useRef } from 'react'
import { useNavigation } from 'react-router'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    if (isNavigating) {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [isNavigating])

  return (
    <LoadingBar
      color='var(--muted-foreground)'
      ref={ref}
      shadow={true}
      height={2}
    />
  )
}
