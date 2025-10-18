import React, { useState } from 'react';
import { useParking } from '../lib/parkingContext';

export default function SlotTypeFilter(){
  const { slots } = useParking();
  const types = Array.from(new Set(slots.map(s=>s.type)));
  const [sel,setSel] = useState('All');
  const filtered = sel==='All' ? slots : slots.filter(s=>s.type===sel);
  return (
    <div>
      <div className="filter-row">
        <label>Filter by Type</label>
        <select value={sel} onChange={e=>setSel(e.target.value)}>
          <option>All</option>
          {types.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="slot-grid">
        {filtered.map(s=>(
          <div key={s.code} className={'slot '+(s.isFree?'free':'occupied')}>
            <div className="slot-code">{s.code}</div>
            <div className="slot-type">{s.type}</div>
            <div className="slot-status">{s.isFree?'Free':'Occupied'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
