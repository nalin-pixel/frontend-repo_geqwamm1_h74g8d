import { useEffect, useState } from 'react'
import { PlaceholderCard, EmptyState } from './Placeholders'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Resources(){
  const [resources, setResources] = useState([])
  const [form, setForm] = useState({title:'', description:'', url:'', category:''})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API}/api/resources`).then(r=>r.json()).then(setResources).finally(()=>setLoading(false))
  },[])

  const seed = async ()=>{
    const samples = [
      { title:'Forest Breathing 101', url:'https://example.com/breathing', description:'A gentle guide to mindful walks among pines.', category:'Wellness' },
      { title:'Herbal Almanac – Moonmint', url:'https://example.com/moonmint', description:'Notes on calming leaves and starry teas.', category:'Herbs' },
      { title:'Glowshroom Safety', url:'https://example.com/glowshrooms', description:'Know which caps to admire and which to avoid.', category:'Safety' },
    ]
    for(const r of samples){
      await fetch(`${API}/api/resources`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(r)})
    }
    const fresh = await (await fetch(`${API}/api/resources`)).json()
    setResources(fresh)
  }

  const submit = async (e)=>{
    e.preventDefault()
    const res = await fetch(`${API}/api/resources`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    await res.json()
    const fresh = await (await fetch(`${API}/api/resources`)).json()
    setResources(fresh)
    setForm({title:'', description:'', url:'', category:''})
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array.from({length:6}).map((_,i)=> <PlaceholderCard key={i} title="Resource" lines={2} />)
        ) : resources.length ? (
          resources.map(r => (
            <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
              <div className="text-xs text-emerald-200/90">{r.category || 'General'}</div>
              <h3 className="text-white font-medium mt-1 group-hover:underline">{r.title}</h3>
              {r.description && <p className="text-purple-100/80 text-sm mt-1 line-clamp-3">{r.description}</p>}
            </a>
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3 grid gap-4">
            <EmptyState title="No resources yet" subtitle="Add a few, or seed with examples." />
            <button onClick={seed} className="w-fit px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow">Seed sample resources</button>
          </div>
        )}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-24 h-fit">
        <h4 className="text-white font-medium mb-2">Add resource</h4>
        <form onSubmit={submit} className="grid gap-3">
          <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input required value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="URL" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Category" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <button className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow">Save</button>
        </form>
      </div>
    </div>
  )
}
