import { useState, useEffect, useRef } from 'react'

/**
 * Reusable scroll-reveal hook using native IntersectionObserver.
 * Respects prefers-reduced-motion by triggering immediately without animation.
 *
 * @param {Object} options IntersectionObserver options
 * @param {number} options.threshold Visibility threshold (default: 0.15)
 * @param {string} options.rootMargin Root margin (default: '0px 0px -40px 0px')
 * @param {boolean} options.triggerOnce Whether to unobserve after first intersection (default: true)
 * @returns {[import('react').RefObject, boolean]} [ref, isInView]
 */
export function useInView(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
  } = options

  const ref = useRef(null)
  const [isInView, setIsInView] = useState(() => {
    // If user prefers reduced motion, render in-view immediately
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    // Check prefers-reduced-motion dynamically
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        setIsInView(true)
        return
      }
    }

    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) {
            observer.unobserve(node)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

export default useInView
