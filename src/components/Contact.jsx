import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', subject:'', message:''})
  const [sent, setSent] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    const res = await fetch(`${API}/api/contact`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    const data = await res.json()
    if(data.received){
      setSent(true)
      setForm({name:'', email:'', subject:'', message:''})
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h4 className="text-white font-medium mb-2">Send a message</h4>
        <form onSubmit={submit} className="grid gap-3">
          <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <input required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="Subject" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50" />
          <textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Message" className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/10 placeholder-purple-200/50 min-h-[120px]" />
          <button className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-emerald-500 text-white shadow">Send</button>
          {sent && <p className="text-emerald-300">Thanks! Your message has been received.</p>}
        </form>
      </div>
      <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-900/40 to-emerald-900/30 border border-white/10">
        <h4 className="text-white font-medium mb-2">Our grove</h4>
        <p className="text-purple-100/80">We dwell among glowing mushrooms and whispering pines. Reach out if you need guidance or wish to share your story.</p>
      </div>
    </div>
  )
}
