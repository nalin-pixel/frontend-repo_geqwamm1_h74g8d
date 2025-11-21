import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Resources(){
  const [resources, setResources] = useState([])
  const [form, setForm] = useState({title:'', description:'', url:'', category:''})

  useEffect(()=>{
    fetch(`${API}/api/resources`).then(r=>r.json()).then(setResources)
  },[])

  const submit = async (e)=>{
    e.preventDefault()
    const res = await fetch(`${API}/api/resources`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    const data = await res.json()
    if(data.id){
      const fresh = await (await fetch(`${API}/api/resources`)).json()
      setResources(fresh)
      setForm({title:'', description:'', url:'', category:''})
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map(r => (
          <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
            <div className="text-xs text-emerald-200/90">{r.category || 'General'}</div>
            <h3 className="text-white font-medium mt-1 group-hover:underline">{r.title}</h3>
            {r.description && <p className="text-purple-100/80 text-sm mt-1 line-clamp-3">{r.description}</p>}
          </a>
        ))}
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
