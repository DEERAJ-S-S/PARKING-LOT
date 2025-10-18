import React, { useState } from 'react';
import { useParking } from '../lib/parkingContext';

export default function RevenueReport(){
  const { history } = useParking();
  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  function getFiltered(){
    const f = from? new Date(from) : null;
    const t = to? new Date(to) : null;
    return history.filter(h=>{
      const out = new Date(h.outTs);
      if(f && out < f) return false;
      if(t && out > t) return false;
      return true;
    });
  }
  const rows = getFiltered();
  const total = rows.reduce((s,r)=> s + (r.amount||0), 0);
  return (
    <div>
      <h2>Revenue Report</h2>
      <div className="row">
        <label>From</label>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <label>To</label>
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
      </div>
      <div style={{marginTop:12}}>
        <div>Total: ₹{total}</div>
        <div style={{marginTop:8}}>
          {rows.map(r=>(
            <div key={r.id} style={{background:'#fff', padding:8, borderRadius:6, marginTop:6}}>
              <div><strong>{r.vehicleNo}</strong> — {r.slotCode} — ₹{r.amount}</div>
              <div style={{color:'#6b7280', fontSize:12}}>Out: {new Date(r.outTs).toLocaleString()}</div>
            </div>
          ))}
          {rows.length===0 && <div style={{marginTop:8}}>No records for selected range</div>}
        </div>
      </div>
    </div>
  );
}
