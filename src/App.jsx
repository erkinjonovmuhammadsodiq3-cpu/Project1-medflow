import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { NavLink, Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, Home, Stethoscope, Building2, LayoutGrid, Activity, Bot, Globe, Moon, Sun, Bell, Search, Play, Heart, Star, ArrowRight, ShieldCheck, Menu, X, Send, Mic, Droplets, Thermometer, Pill, FlaskConical, Users, CalendarCheck, FileText, Settings, Smartphone } from 'lucide-react';
import { T, DOCS } from './data.js';

const Ctx = createContext();
const useC = () => useContext(Ctx);
const fmt = n => n.toLocaleString('ru-RU').replace(/\u00a0/g, ' ');
const ini = n => n.replace('Dr. ', '').split(' ').map(w => w[0]).join('');

function Ecg() {
  return <svg className="ecg" viewBox="0 0 300 60" preserveAspectRatio="none"><path d="M0 30h60l8-18 10 40 10-32 8 10h60l8-22 10 44 10-28 8 6h108" /></svg>;
}
function Counter({ to, suffix = '' }) {
  const [v, setV] = useState(0); const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; io.disconnect(); const t0 = performance.now(); const step = t => { const p = Math.min((t - t0) / 1200, 1); setV(Math.round(to * p)); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); });
    io.observe(ref.current); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Nav() {
  const { t, lang, setLang, theme, setTheme, toast } = useC();
  const [open, setOpen] = useState(false); const [q, setQ] = useState(''); const nav = useNavigate();
  const [notif, setNotif] = useState(3);
  const links = [['/', Home, t.home], ['/doctors', Stethoscope, t.doctors], ['/clinics', Building2, t.clinics], ['/dashboard', LayoutGrid, t.dash], ['/ai', Bot, t.ai], ['/legacy', Activity, t.old]];
  const search = e => { e.preventDefault(); nav('/doctors?q=' + encodeURIComponent(q)); setOpen(false); };
  return <header className="nav glass">
    <Link to="/" className="logo"><HeartPulse size={30} /><b>Med<span>Flow</span></b></Link>
    <nav className={open ? 'links open' : 'links'}>
      {links.map(([to, I, l]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}><I size={16} />{l}</NavLink>)}
      <form onSubmit={search} className="search mob"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} /></form>
    </nav>
    <div className="tools">
      <select aria-label="Language" value={lang} onChange={e => setLang(e.target.value)}><option value="uz">UZ</option><option value="en">EN</option><option value="ru">RU</option></select>
      <button className="ic" aria-label="Theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}</button>
      <button className="ic" aria-label="Notifications" onClick={() => { toast(notif ? `${notif} ta yangi bildirishnoma (demo)` : '—'); setNotif(0); }}><Bell size={18} />{notif > 0 && <i className="dot">{notif}</i>}</button>
      <Link to="/dashboard" className="avatar">AK</Link>
      <button className="ic burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function DocCard({ d }) {
  const { t, fav, toggleFav, toast } = useC();
  return <article className="doc card">
    <button className={'fav' + (fav.includes(d.id) ? ' on' : '')} aria-label="Favorite" onClick={() => toggleFav(d.id)}><Heart size={16} /></button>
    <div className="portrait" style={{ background: `radial-gradient(circle at 50% 30%, ${d.c[1]}66, ${d.c[0]}22 70%)` }}><span style={{ background: `linear-gradient(135deg,${d.c[0]},${d.c[1]})` }}>{ini(d.name)}</span>{d.on && <em className="live">online</em>}</div>
    <div className="rate"><Star size={13} fill="currentColor" /> {d.rate} <small>({d.rev})</small></div>
    <h4>{d.name}</h4><p>{d.spec}</p><p className="mut">{d.exp} {t.yrs}</p><b>{fmt(d.price)} {t.som}</b>
    <button className="btn sm" onClick={() => toast(t.booked + ' — ' + d.name)}>{t.book} <ArrowRight size={14} /></button>
  </article>;
}

function HomePage() {
  const { t, toast } = useC(); const nav = useNavigate();
  const [sel, setSel] = useState([]); const [q, setQ] = useState('');
  const icons = [Bot, Users, Building2, FlaskConical, Pill, Activity]; const links = ['/ai', '/doctors', '/clinics', '/dashboard', '/dashboard', '/dashboard'];
  return <main>
    <section className="hero">
      <div className="hero-txt">
        <span className="pill"><ShieldCheck size={14} />{t.badge}</span>
        <h1>{t.h1a} <em>{t.h1b}</em></h1>
        <p>{t.sub}</p>
        <div className="row"><button className="btn" onClick={() => nav('/doctors')}>{t.find} <ArrowRight size={16} /></button><button className="btn ghost" onClick={() => toast('Video (demo)')}><Play size={16} />{t.video}</button></div>
        <div className="trust"><div className="faces">{['AK', 'MO', 'SG', 'DR'].map(x => <i key={x}>{x}</i>)}</div><b>+50K</b><small>{t.happy}</small></div>
      </div>
      <div className="hero-vis">
        <div className="holo h1"><Ecg /><HeartPulse size={80} className="bigheart" /></div>
        <div className="holo h2"><Activity size={28} /><span>BPM 72</span><Ecg /></div>
        <div className="doctor-art"><div className="head" /><div className="coat" /></div>
        <div className="glass quick"><h5>{t.quick}</h5>{t.svc.slice(0, 5).map(([a], i) => { const I = icons[i]; return <Link key={a} to={links[i]}><I size={15} />{a}</Link>; })}</div>
        <Link to="/ai" className="aibox glass"><Bot size={34} /><div><b>MedFlow AI</b><small>{t.ask}</small></div></Link>
      </div>
    </section>

    <section className="services">{t.svc.map(([a, b], i) => { const I = icons[i]; return <Link to={links[i]} key={a} className="card svc"><span className="ico"><I size={22} /></span><div><b>{a}</b><small>{b}</small></div></Link>; })}</section>

    <section className="grid3">
      <div className="card check">
        <h3>{t.check}</h3><p className="mut">{t.feel}</p>
        {t.sym.map(s => <button key={s} className={'chip' + (sel.includes(s) ? ' on' : '')} onClick={() => setSel(sel.includes(s) ? sel.filter(x => x !== s) : [...sel, s])}>{s}</button>)}
        <button className="btn sm" disabled={!sel.length} onClick={() => nav('/ai?q=' + encodeURIComponent(sel.join(', ')))}>{t.go} <ArrowRight size={14} /></button>
        <small className="disc">{t.disc}</small>
      </div>
      <div className="card docs">
        <div className="between"><h3>{t.popular}</h3><Link to="/doctors" className="link">{t.all} <ArrowRight size={14} /></Link></div>
        <div className="docgrid">{DOCS.slice(0, 4).map(d => <DocCard key={d.id} d={d} />)}</div>
      </div>
      <div className="side">
        <div className="card">
          <div className="between"><h3>{t.stats}</h3><small className="tag">{t.demo}</small></div>
          <div className="ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" /><circle cx="18" cy="18" r="15" className="arc" /></svg><b>92%</b></div>
          <div className="vit"><span><Heart size={16} />72 bpm</span><span><Droplets size={16} />98% SpO₂</span><span><Thermometer size={16} />36.6°C</span></div><Ecg />
        </div>
        <div className="card mob"><Smartphone size={44} /><div><h4>{t.mobile}</h4><small>{t.mobSub}</small><div className="row"><button className="store" onClick={() => toast('App Store (demo)')}>App Store</button><button className="store" onClick={() => toast('Google Play (demo)')}>Google Play</button></div></div></div>
      </div>
    </section>

    <section className="bar">
      <div className="card nums">{[[500, '+'], [200, '+'], [1, 'M+'], [99, '%']].map(([n, s], i) => <div key={i}><b><Counter to={n} suffix={s} /></b><small>{t.n[i]}</small></div>)}</div>
      <div className="card cta"><ShieldCheck size={44} /><b>{t.cta}</b><Link to="/dashboard" className="btn sm">{t.reg}<ArrowRight size={14} /></Link></div>
    </section>
  </main>;
}

function Doctors() {
  const { t } = useC(); const loc = useLocation();
  const [q, setQ] = useState(new URLSearchParams(loc.search).get('q') || ''); const [sp, setSp] = useState('');
  useEffect(() => setQ(new URLSearchParams(loc.search).get('q') || ''), [loc.search]);
  const list = DOCS.filter(d => (!sp || d.spec === sp) && (d.name + d.spec).toLowerCase().includes(q.toLowerCase()));
  return <main className="page"><h2>{t.doctors}</h2>
    <div className="row"><div className="search"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} /></div>
      <select value={sp} onChange={e => setSp(e.target.value)}><option value="">{t.filter}</option>{[...new Set(DOCS.map(d => d.spec))].map(s => <option key={s}>{s}</option>)}</select></div>
    {list.length ? <div className="docgrid big">{list.map(d => <DocCard key={d.id} d={d} />)}</div> : <p className="mut">—</p>}</main>;
}

function Clinics() {
  const { toast } = useC();
  const cl = [['MedFlow Central', 'Toshkent, Yunusobod', 24], ['Shifo Plus', 'Toshkent, Chilonzor', 18], ['Yurak Markazi', 'Samarqand', 12], ['Kids Care', 'Toshkent, Mirzo Ulug‘bek', 15]];
  return <main className="page"><h2>Klinikalar <small className="tag">Demo</small></h2><div className="docgrid big">{cl.map(([n, a, d]) => <div className="card" key={n}><Building2 size={30} /><h4>{n}</h4><p className="mut">{a}</p><p>{d} shifokor</p><button className="btn sm" onClick={() => toast(n + ' (demo)')}>Batafsil <ArrowRight size={14} /></button></div>)}</div></main>;
}

function Dashboard() {
  const { t } = useC();
  const bars = [40, 65, 50, 80, 60, 92, 75];
  return <main className="page"><h2>{t.dash} <small className="tag">{t.demo}</small></h2>
    <div className="dash">
      <aside className="card side-menu">{[[LayoutGrid, 'Overview'], [CalendarCheck, t.appts], [FileText, 'Hujjatlar'], [Heart, 'Sog‘liq'], [Settings, 'Sozlamalar']].map(([I, l]) => <a key={l}><I size={16} />{l}</a>)}</aside>
      <section className="card"><h3>{t.stats}</h3><div className="bars">{bars.map((b, i) => <i key={i} style={{ height: b + '%', animationDelay: i * 80 + 'ms' }} />)}</div></section>
      <section className="card"><h3>{t.appts}</h3>{DOCS.slice(0, 3).map((d, i) => <div className="appt" key={d.id}><span className="ico">{ini(d.name)}</span><div><b>{d.name}</b><small>{d.spec}</small></div><em>{['Bugun 15:00', 'Ertaga 10:30', 'Juma 12:00'][i]}</em></div>)}</section>
    </div></main>;
}

function AI() {
  const { t } = useC(); const loc = useLocation();
  const [msgs, setMsgs] = useState([{ r: 'ai', m: 'Salom! Men MedFlow AI. ' + t.aiNote }]); const [v, setV] = useState(''); const [typing, setTyping] = useState(false); const end = useRef();
  const send = text => { if (!text.trim()) return; setMsgs(m => [...m, { r: 'me', m: text }]); setV(''); setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { r: 'ai', m: `"${text}" bo‘yicha umumiy ma’lumot: dam oling, suyuqlik iching. Belgilar davom etsa yoki kuchaysa, shifokorga murojaat qiling. (Demo javob — haqiqiy AI backend ulanmagan.)`, doc: true }]); }, 1200); };
  useEffect(() => { const q = new URLSearchParams(loc.search).get('q'); if (q) send(q); }, []);
  useEffect(() => end.current?.scrollIntoView({ behavior: 'smooth' }), [msgs, typing]);
  return <main className="page ai"><div className="aihead"><Bot size={44} className="pulse" /><div><h2>MedFlow AI</h2><small className="mut">{t.aiNote}</small></div></div>
    <div className="card chat">{msgs.map((x, i) => <div key={i} className={'msg ' + x.r}>{x.m}{x.doc && <Link to="/doctors" className="link"> → {t.doctors}</Link>}</div>)}{typing && <div className="msg ai typing"><i /><i /><i /></div>}<div ref={end} /></div>
    <div className="row sug">{['Bosh og‘rig‘i', 'Isitma', 'Yurak'].map(s => <button key={s} className="chip" onClick={() => send(s)}>{s}</button>)}</div>
    <form className="inp" onSubmit={e => { e.preventDefault(); send(v); }}><button type="button" className="ic" aria-label="Voice" onClick={() => send('(ovozli kiritish demo)')}><Mic size={18} /></button><input value={v} onChange={e => setV(e.target.value)} placeholder={t.ask} /><button className="btn sm">{t.send}<Send size={14} /></button></form></main>;
}

function Legacy() { return <iframe className="legacy" title="MedFlow legacy app" src="/legacy/index.html" />; }

export default function App() {
  const [lang, setLang] = useState(localStorage.mfLang || 'uz'); const [theme, setTheme] = useState(localStorage.mfTheme || 'dark');
  const [fav, setFav] = useState([]); const [msg, setMsg] = useState('');
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.mfTheme = theme; }, [theme]);
  useEffect(() => { document.documentElement.lang = lang; localStorage.mfLang = lang; }, [lang]);
  const toast = m => { setMsg(m); clearTimeout(toast.t); toast.t = setTimeout(() => setMsg(''), 2200); };
  const t = T[lang];
  const toggleFav = id => { setFav(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]); toast(t.saved); };
  return <Ctx.Provider value={{ t, lang, setLang, theme, setTheme, fav, toggleFav, toast }}>
    <div className="bg" /><Nav />
    <Routes><Route path="/" element={<HomePage />} /><Route path="/doctors" element={<Doctors />} /><Route path="/clinics" element={<Clinics />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/ai" element={<AI key={lang} />} /><Route path="/legacy" element={<Legacy />} /></Routes>
    {msg && <div className="toast glass" role="status">{msg}</div>}
  </Ctx.Provider>;
}
