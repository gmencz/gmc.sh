import { useState, useEffect, useRef } from 'react'

export default function useOnLeave(initialIsVisible = true) {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleLeave = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsVisible(false)
    }
  }

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleLeave, true)
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('keydown', handleLeave, true)
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isVisible, setIsVisible }
}
