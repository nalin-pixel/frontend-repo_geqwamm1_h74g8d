import { useEffect, useState } from 'react'
import { PlaceholderCard, EmptyState } from './Placeholders'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Blog(){
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({title:'', content:'', author:'Forest Fairy', cover_image:'', tags:''})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch(`${API}/api/posts`).then(r=>r.json()).then(setPosts).finally(()=>setLoading(false))
  },[])

  const seed = async ()=>{
    // create a handful of whimsical placeholder posts
    const samples = [
      { title: 'Dawn Among the Pines', content: 'The grove wakes under a lilac sky; dew beads glow like runes.', author:'Auri', cover_image:'', tags:['dawn','grove'] },
      { title: 'Mushroom Lantern Festival', content: 'Caps flicker with soft bioluminescence guiding lost travelers home.', author:'Lyra', cover_image:'', tags:['mushroom','festival'] },
      { title: 'Herbal Notes: Moonmint', content: 'Cooling leaves that calm the mind and brighten dreams.', author:'Thistle', cover_image:'', tags:['herb','wellness'] }
    ]
    for(const p of samples){
      await fetch(`${API}/api/posts`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(p)})
    }
    const fresh = await (await fetch(`${API}/api/posts`)).json()
    setPosts(fresh)
  }

  const submit = async (e)=>{
    e.preventDefault()
    const payload = {...form, tags: form.tags? form.tags.split(',').map(t=>t.trim()) : []}
    await fetch(`${API}/api/posts`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const fresh = await (await fetch(`${API}/api/posts`)).json()
    setPosts(fresh)
    setForm({title:'', content:'', author:'Forest Fairy', cover_image:'', tags:''})
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        {loading? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({length:6}).map((_,i)=> <PlaceholderCard key={i} />)}
          </div>
        ) : posts.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(p => (
              <article key={p.id} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="aspect-video bg-gradient-to-tr from-purple-800/30 to-emerald-600/30">
                  {p.cover_image && <img src={p.cover_image} alt="cover" className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium line-clamp-2">{p.title}</h3>
                  <p className="text-purple-100/80 text-sm mt-1 line-clamp-3">{p.content}</p>
                  <div className="text-emerald-200/90 text-xs mt-2">By {p.author}</div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            <EmptyState title="No posts yet" subtitle="Plant your first story or seed with examples." />
            <button onClick={seed} className="w-fit px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow">Seed sample posts</button>
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-24 h-fit">
        <h4 className="text-white font-medium mb-2">Quick post</h4>
        <form onSubmit={submit} className="grid gap-3">
          <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <textarea required value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Content" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input value={form.cover_image} onChange={e=>setForm({...form,cover_image:e.target.value})} placeholder="Cover image URL" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Tags (comma separated)" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <button className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow">Publish</button>
        </form>
      </div>
    </div>
  )
}
