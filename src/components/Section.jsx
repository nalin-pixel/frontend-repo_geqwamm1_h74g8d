export default function Section({id, title, subtitle, children}){
  return (
    <section id={id} className="py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-purple-100/80 mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
