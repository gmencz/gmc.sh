import { useState, useEffect, useRef } from 'react'

type UseOnLeaveOptions = Partial<{
  onLeave: VoidFunction
  events: ('click-outside' | 'escape')[]
}>

export default function useOnLeave(
  initialIsVisible = true,
  options: UseOnLeaveOptions = { events: ['click-outside', 'escape'] },
) {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleLeave = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      options.onLeave?.()
      setIsVisible(false)
    }
  }

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      options.onLeave?.()
      setIsVisible(false)
    }
  }

  useEffect(() => {
    if (options.events?.includes('escape')) {
      document.addEventListener('keydown', handleLeave, true)
    }
    if (options.events?.includes('click-outside')) {
      document.addEventListener('click', handleClickOutside, true)
    }
    return () => {
      if (options.events?.includes('escape')) {
        document.removeEventListener('keydown', handleLeave, true)
      }
      if (options.events?.includes('click-outside')) {
        document.removeEventListener('click', handleClickOutside, true)
      }
    }
  })

  return { ref, isVisible, setIsVisible }
}
