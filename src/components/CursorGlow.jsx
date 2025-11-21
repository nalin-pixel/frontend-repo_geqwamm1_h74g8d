import { useEffect, useRef } from 'react'

// A soft, fairy-glow cursor follower that smoothly trails the mouse
export default function CursorGlow(){
  const dotRef = useRef(null)
  const rafRef = useRef(0)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMove, { passive: true })

    // Smooth follow using lerp
    const tick = () => {
      const lerp = 0.18 // higher = quicker follow; adjust if it feels laggy
      pos.current.x += (target.current.x - pos.current.x) * lerp
      pos.current.y += (target.current.y - pos.current.y) * lerp

      if (dotRef.current){
        const d = dotRef.current
        // Use translate3d for better performance and to fully match mouse
        d.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 24,
        height: 24,
        borderRadius: 9999,
        boxShadow: '0 0 60px 20px rgba(52,211,153,0.25), 0 0 30px 10px rgba(147,51,234,0.25)',
        background: 'radial-gradient(circle at 40% 40%, rgba(147,51,234,0.9), rgba(16,185,129,0.7))',
        mixBlendMode: 'screen',
        filter: 'blur(1px)',
        transition: 'box-shadow 200ms ease',
      }}
    />
  )
}
