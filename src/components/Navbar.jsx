import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkBase = 'text-sm md:text-base px-3 py-2 rounded-md transition-colors'
  const active = 'text-white bg-white/10'
  const idle = 'text-purple-100/80 hover:text-white hover:bg-white/10'

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-gradient-to-b from-black/40 to-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-emerald-400 ring-2 ring-white/20 shadow-lg" />
            <span className="font-semibold tracking-tight text-white">Forest Fairy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Home</NavLink>
            <NavLink to="/blog" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Blog</NavLink>
            <NavLink to="/resources" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Resources</NavLink>
            <NavLink to="/doctors" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Doctors</NavLink>
            <NavLink to="/about" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>About</NavLink>
            <NavLink to="/contact" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Contact</NavLink>
          </nav>

          <button className="md:hidden text-purple-100" onClick={()=>setOpen(o=>!o)}>
            <Menu />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 grid gap-2">
            <NavLink onClick={()=>setOpen(false)} to="/" end className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Home</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/blog" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Blog</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/resources" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Resources</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/doctors" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Doctors</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/about" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>About</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/contact" className={({isActive})=>`${linkBase} ${isActive?active:idle}`}>Contact</NavLink>
          </div>
        )}
      </div>
    </header>
  )
}
