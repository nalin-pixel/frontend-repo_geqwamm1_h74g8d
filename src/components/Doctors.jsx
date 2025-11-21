import { useEffect, useState } from 'react'
import { PlaceholderCard, EmptyState } from './Placeholders'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Doctors(){
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({name:'', specialty:'', bio:'', photo_url:'', rating:5, clinic:'', location:''})
  const [adding, setAdding] = useState(false)

  useEffect(()=>{
    fetch(`${API}/api/doctors`).then(r=>r.json()).then(setDoctors).catch(()=>setError('Failed to load')).finally(()=>setLoading(false))
  },[])

  const seed = async ()=>{
    const samples = [
      { name:'Dr. Rowan Moss', specialty:'Herbalist', clinic:'Willow Clinic', location:'Glade Town', rating:5, bio:'Gentle remedies drawn from moonlit leaves.' },
      { name:'Dr. Elowen Fern', specialty:'Forest Therapist', clinic:'Whispering Pines', location:'Evervale', rating:4, bio:'Mindful walks and breath among ancient trees.' },
      { name:'Dr. Thorne Briar', specialty:'Mycology', clinic:'Lantern Caps Lab', location:'Mirebrook', rating:5, bio:'Guardian of safe shrooms and glowing caps.' }
    ]
    for(const d of samples){
      await fetch(`${API}/api/doctors`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(d)})
    }
    const fresh = await (await fetch(`${API}/api/doctors`)).json()
    setDoctors(fresh)
  }

  const submit = async (e)=>{
    e.preventDefault()
    setAdding(true)
    setError('')
    try{
      const res = await fetch(`${API}/api/doctors`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      await res.json()
      const fresh = await (await fetch(`${API}/api/doctors`)).json()
      setDoctors(fresh)
      setForm({name:'', specialty:'', bio:'', photo_url:'', rating:5, clinic:'', location:''})
    }catch(err){
      setError('Network error')
    }finally{
      setAdding(false)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({length:6}).map((_,i)=> <PlaceholderCard key={i} title="Doctor" lines={3} />)}
          </div>
        ) : doctors.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map(doc=> (
              <div key={doc.id} className="group rounded-2xl bg-white/5 border border-white/10 p-4 transition hover:bg-white/10">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-tr from-purple-700/30 to-emerald-600/30">
                  {doc.photo_url && <img src={doc.photo_url} alt={doc.name} className="w-full h-full object-cover" />}
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{doc.name}</h3>
                    <div className="flex gap-0.5">
                      {Array.from({length: doc.rating || 0}).map((_,i)=> (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-emerald-200/90 text-sm">{doc.specialty}</p>
                  {doc.clinic && <p className="text-purple-100/70 text-xs mt-1">{doc.clinic} • {doc.location}</p>}
                  {doc.bio && <p className="text-purple-100/80 text-sm mt-2 line-clamp-3">{doc.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            <EmptyState title="No doctors yet" subtitle="Add a few trusted professionals or seed examples." />
            <button onClick={seed} className="w-fit px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow">Seed sample doctors</button>
          </div>
        )}
        {error && <p className="text-red-300 mt-3">{error}</p>}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-24 h-fit">
        <h4 className="text-white font-medium mb-2">Add a verified doctor</h4>
        <p className="text-purple-100/70 text-sm mb-4">Rating can only be set on creation.</p>
        <form onSubmit={submit} className="grid gap-3">
          <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input required value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} placeholder="Specialty" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input value={form.clinic} onChange={e=>setForm({...form,clinic:e.target.value})} placeholder="Clinic/Hospital" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Location" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input value={form.photo_url} onChange={e=>setForm({...form,photo_url:e.target.value})} placeholder="Photo URL" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Short bio" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <label className="text-purple-100/80 text-sm">Rating on create
            <select value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})} className="ml-2 bg-white/10 text-white rounded-lg px-2 py-1 border border-white/10">
              {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <button disabled={adding} className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow disabled:opacity-60">{adding? 'Adding...' : 'Add Doctor'}</button>
        </form>
        {!loading && !doctors.length && (
          <button onClick={seed} className="mt-3 w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10">Seed sample doctors</button>
        )}
      </div>
    </div>
  )
}
