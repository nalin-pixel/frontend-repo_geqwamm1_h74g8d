import Spline from '@splinetool/react-spline'

export default function Hero(){
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.18),transparent_35%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(79,70,229,0.35)]">A forest fairy blog in purple and green</h1>
          <p className="mt-4 text-lg md:text-xl text-purple-100/90">Whimsical stories, health resources, and a trusted catalog of verified doctors — all in one calming, animated grove.</p>
          <div className="mt-8 flex gap-3">
            <a href="#blog" className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow-lg shadow-purple-500/25 hover:scale-[1.02] transition">Read the blog</a>
            <a href="#doctors" className="px-5 py-3 rounded-xl bg-white/10 text-white backdrop-blur border border-white/20 hover:bg-white/15 transition">Find doctors</a>
          </div>
        </div>
      </div>
    </section>
  )
}
