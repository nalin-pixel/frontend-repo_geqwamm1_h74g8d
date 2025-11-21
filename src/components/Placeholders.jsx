import { useMemo } from 'react'

export function PlaceholderCard({ title='Mushroom Musings', lines=3 }){
  const shimmerId = useMemo(()=>`shimmer-${Math.random().toString(36).slice(2)}`,[ ])
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="aspect-video bg-gradient-to-tr from-purple-800/20 to-emerald-600/20" />
      <div className="p-4">
        <h3 className="text-white/90 font-medium">{title}</h3>
        <div className="mt-2 grid gap-2">
          {Array.from({length: lines}).map((_,i)=> (
            <div key={i} className="h-3 rounded bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function EmptyState({ title='Nothing here yet', subtitle='Your grove awaits new stories and links.' }){
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500/40 to-emerald-400/40" />
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-purple-100/80 text-sm">{subtitle}</p>
    </div>
  )
}
