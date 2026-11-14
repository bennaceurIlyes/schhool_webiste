import React, { useState, useEffect } from 'react'
import './Splash.css'
import studentImg from '../../assets/image.png'

// SPA-aware in-memory flag: never replay on in-app client route changes
let spaAlreadyMounted = false

export default function Splash({ onFinish }) {
  // Synchronously initialize to true on cold load / page load, false if already shown in this SPA session
  const [shouldRender, setShouldRender] = useState(() => !spaAlreadyMounted)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [progress, setProgress] = useState(20)

  useEffect(() => {
    // If already displayed in this SPA session, exit cleanly
    if (spaAlreadyMounted) {
      if (onFinish) onFinish()
      return
    }

    // Mark as shown so in-app navigation will never replay it
    spaAlreadyMounted = true

    // Check if user prefers reduced motion
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      // Instant show/hide, no animated fill (Task 3 spec)
      setProgress(100)
      const timer = setTimeout(() => {
        setShouldRender(false)
        if (onFinish) onFinish()
      }, 600)
      return () => clearTimeout(timer)
    }

    const startTime = Date.now()
    const MIN_DURATION = 900 // Minimum display time for smooth visual pacing
    const MAX_TIMEOUT = 3500 // Hard safety timeout

    // Smooth incremental progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 88) {
          const next = prev + Math.floor(Math.random() * 12 + 6)
          return Math.min(next, 88)
        }
        return prev
      })
    }, 90)

    // Preload critical hero image + wait for font loading
    const preloadHeroAsset = new Promise((resolve) => {
      const img = new Image()
      img.src = studentImg
      if (img.complete) {
        resolve(true)
      } else {
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
      }
    })

    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve()
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(true), MAX_TIMEOUT)
    })

    Promise.race([
      Promise.all([preloadHeroAsset, fontsPromise]),
      timeoutPromise,
    ]).then(() => {
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_DURATION - elapsed)

      setTimeout(() => {
        clearInterval(progressInterval)
        setProgress(100)

        // Hold briefly at 100% then perform smooth ease-out fade
        setTimeout(() => {
          setIsFadingOut(true)
          setTimeout(() => {
            setShouldRender(false)
            if (onFinish) onFinish()
          }, 450)
        }, 160)
      }, remainingTime)
    })

    return () => {
      clearInterval(progressInterval)
    }
  }, [onFinish])

  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={`splash-overlay ${isFadingOut ? 'splash-fade-out' : ''}`}
      aria-hidden={isFadingOut}
      role="status"
      aria-label="جاري تجهيز مساحتك التعليمية"
    >
      <div className="splash-center-card">
        {/* School Emblem: Academic Open Book in --color-primary (No Crown) */}
        <div className="splash-mark-container" aria-hidden="true">
          <svg
            className="splash-mark-svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M9 7h7" />
            <path d="M9 11h5" />
          </svg>
        </div>

        <div className="splash-title">المدرسة</div>
        <div className="splash-subtitle">المنصة التعليمية الشاملة</div>

        {/* 1px Gold Divider in --color-primary below the mark */}
        <div className="splash-divider" aria-hidden="true" />

        {/* 2.5px Progress Bar: Track rgba(255,255,255,0.15), Fill #2A3A5C -> --color-primary */}
        <div className="splash-progress-track" aria-hidden="true">
          <div
            className="splash-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Real Status Line in --bg-page Warm Ivory */}
        <div className="splash-status-text">
          جاري تجهيز مساحتك التعليمية...
        </div>
      </div>
    </div>
  )
}
