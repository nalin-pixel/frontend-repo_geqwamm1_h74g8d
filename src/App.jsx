import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'
import Blog from './components/Blog'
import Resources from './components/Resources'
import Doctors from './components/Doctors'
import Contact from './components/Contact'
import About from './components/About'
import CursorGlow from './components/CursorGlow'

function Home(){
  return (
    <>
      <Hero />
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="relative bg-gradient-to-b from-black via-black/80 to-black">
          <Section id="blog" title="Latest posts" subtitle="Write and publish instantly">
            <Blog />
          </Section>
          <Section id="resources" title="Resources" subtitle="Curated links for your journey">
            <Resources />
          </Section>
          <Section id="doctors" title="Verified doctors" subtitle="Browse trusted professionals">
            <Doctors />
          </Section>
        </div>
      </div>
    </>
  )
}

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,#4c1d95_0%,transparent_60%),radial-gradient(1000px_1000px_at_120%_120%,#065f46_0%,transparent_50%),#0b0b12] text-purple-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Section title="Blog"><Blog /></Section>} />
          <Route path="/resources" element={<Section title="Resources"><Resources /></Section>} />
          <Route path="/doctors" element={<Section title="Doctors"><Doctors /></Section>} />
          <Route path="/about" element={<Section title="About"><About /></Section>} />
          <Route path="/contact" element={<Section title="Contact"><Contact /></Section>} />
        </Routes>
        <footer className="py-10 text-center text-purple-200/70">Made with a little fairy dust ✨</footer>
        <CursorGlow />
      </div>
    </BrowserRouter>
  )
}

export default App
